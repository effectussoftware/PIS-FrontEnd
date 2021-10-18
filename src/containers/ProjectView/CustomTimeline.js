import React, { Component, useState, useEffect } from "react";
import moment from "moment";
import Timeline from "react-calendar-timeline";
import randomColor from "randomcolor";
import { axiosInstance } from "../../config/axios";

var keys = {
  groupIdKey: "id",
  groupTitleKey: "title",
  groupRightTitleKey: "rightTitle",
  itemIdKey: "id",
  itemTitleKey: "title",
  itemDivTitleKey: "title",
  itemGroupKey: "group",
  itemTimeStartKey: "start",
  itemTimeEndKey: "end",
  groupLabelKey: "title",
};

export default function ProjectTimeline() {

  const [groups, setGroups] = useState([]);
  const [items, setItems] = useState([]);
  var groupsToAdd = [];
  var itemsToAdd = [];

  const fetchData = async () => {
    const response = await axiosInstance.get("/projects");
    const rows = response.data.projects;
    rows.map((proj) => {
      groupsToAdd.push({
        id: proj.id,
        title: proj.name,
        bgColor: randomColor({ luminosity: "light" }),
      });
    });
    setGroups(groupsToAdd);
    rows.map((proj) => {
      const startDate = new Date(proj.start_date);
      const startValue = moment(startDate).valueOf();
      const endDate = new Date(proj.end_date);
      const endValue = moment(endDate).valueOf();

      itemsToAdd.push({
        id: proj.id,
        group: proj.id,
        start: startValue,
        end: endValue,
        canMove: startValue > new Date().getTime(),
        canResize: "both",
        className: moment(startDate).day() === 6 || moment(startDate).day() === 0
          ? "item-weekend"
          : "",
      });
    });
    setItems(itemsToAdd);
  }
  useEffect(() => {
    fetchData();
  }, []);

  console.log("groups", groups)
  console.log("items", items)

  const defaultTimeStart = moment().startOf("day").toDate();
  const defaultTimeEnd = moment().startOf("day").add(1, "day").toDate();

  const itemRenderer = ({
    item,
    timelineContext,
    itemContext,
    getItemProps,
    getResizeProps
  }) => {
    const { left: leftResizeProps, right: rightResizeProps } = getResizeProps();
    const backgroundColor = itemContext.selected
      ? itemContext.dragging
        ? "red"
        : item.selectedBgColor
      : item.bgColor;
    const borderColor = itemContext.resizing ? "red" : item.color;
    return (
      <div
        {...getItemProps({
          style: {
            backgroundColor,
            color: item.color,
            borderColor,
            borderStyle: "solid",
            borderWidth: 1,
            borderRadius: 4,
            borderLeftWidth: itemContext.selected ? 3 : 1,
            borderRightWidth: itemContext.selected ? 3 : 1
          }
        })}
      >
        {itemContext.useResizeHandle ? <div {...leftResizeProps} /> : null}
        <div
          style={{
            height: itemContext.dimensions.height,
            overflow: "hidden",
            paddingLeft: 3,
            textOverflow: "ellipsis",
            whiteSpace: "nowrap"
          }}
        >
          {itemContext.title}
        </div>
        {itemContext.useResizeHandle ? <div {...rightResizeProps} /> : null}
      </div>
    );
  };

  if (groups.length > 0 && items.length > 0) {
    return (
      <Timeline
        groups={groups}
        items={items}
        keys={keys}
        fullUpdate
        itemTouchSendsClick={true}
        dragSnap={60 * 60 * 24 * 1000} //dia
        itemHeightRatio={0.75}
        canMove={true} //se pueden mover
        canChangeGroup={false} //no se pueden "cambiar de renglon"
        canResize={"both"}
        defaultTimeStart={defaultTimeStart}
        defaultTimeEnd={defaultTimeEnd}
      //onItemMove={this.handleItemMove}
      //onItemResize={this.handleItemResize}
      />
    );
  }
  return null
}















