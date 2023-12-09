import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from "@angular/cdk/drag-drop";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class DropListService {
  constructor() {}

  drop(
    event: CdkDragDrop<any[]>,
    dateConfig?: { end?: Date | null; start?: Date | null }
  ) {
    const currentContainer = event.container;
    const previousContainer = event.previousContainer;
    const currentIndex = event.currentIndex;
    const previousIndex = event.previousIndex;

    const droppedItem =
      previousContainer === currentContainer
        ? { ...currentContainer.data[previousIndex] }
        : { ...previousContainer.data[previousIndex] };

    const permittedPosition: number = this.getPermittedPosition(
      droppedItem,
      currentContainer,
      previousContainer,
      currentIndex
    );

    const updatedItems: any[] = [];

    if (previousContainer === currentContainer) {
      moveItemInArray(currentContainer.data, previousIndex, permittedPosition);

      currentContainer.data.forEach((item) => {
        if (item.position !== currentContainer.data.indexOf(item)) {
          updatedItems.push({
            _id: item._id,
            position: currentContainer.data.indexOf(item),
          });
        }
      });
    } else {
      if (dateConfig) {
        if (dateConfig.hasOwnProperty("end")) {
          droppedItem.endDate = dateConfig.end;
        }
        if (dateConfig.hasOwnProperty("start")) {
          droppedItem.startDate = dateConfig.start;
        }
      }

      transferArrayItem(
        previousContainer.data,
        currentContainer.data,
        previousIndex,
        permittedPosition
      );

      updatedItems.push({
        _id: droppedItem._id,
        status: currentContainer.id,
        endDate: droppedItem.endDate,
        startDate: droppedItem.startDate,
        position: permittedPosition,
      });

      currentContainer.data.forEach((item) => {
        if (
          item._id !== droppedItem._id &&
          item.position !== currentContainer.data.indexOf(item)
        ) {
          updatedItems.push({
            _id: item._id,
            position: currentContainer.data.indexOf(item),
          });
        }
      });
      previousContainer.data.forEach((item) => {
        if (
          item._id !== droppedItem._id &&
          item.position !== previousContainer.data.indexOf(item)
        ) {
          updatedItems.push({
            _id: item._id,
            position: previousContainer.data.indexOf(item),
          });
        }
      });
    }

    return updatedItems;
  }

  getPermittedPosition(
    item: any,
    currentContainer: any,
    previousContainer: any,
    currentIndex: number
  ) {
    const lastPinnedIndex = this.getLastPinnedIndex(currentContainer.data);
    let permittedPosition: number = currentIndex;

    if (!item.pinned) {
      if (lastPinnedIndex >= 0 && currentIndex <= lastPinnedIndex) {
        permittedPosition = lastPinnedIndex + 1;
      }
    } else if (item.pinned) {
      if (lastPinnedIndex == undefined) {
        permittedPosition = 0;
      } else if (
        previousContainer === currentContainer &&
        currentIndex > lastPinnedIndex
      ) {
        permittedPosition = lastPinnedIndex;
      } else if (currentIndex > lastPinnedIndex) {
        permittedPosition = lastPinnedIndex + 1;
      }
    }
    return permittedPosition;
  }

  onPinToggle(itemList: any[], data: any) {
    const initialItemPosition = data.position;
    const lastPinnedIndex = this.getLastPinnedIndex(itemList);
    const updatedItems: any[] = [];

    let permittedPosition = lastPinnedIndex + 1;

    if (data.pinned) {
      permittedPosition = lastPinnedIndex;
    } else if (!data.pinned) {
      if (lastPinnedIndex == undefined) {
        permittedPosition = 0;
      } else {
        permittedPosition = lastPinnedIndex + 1;
      }
    }

    moveItemInArray(itemList, initialItemPosition, permittedPosition);

    updatedItems.push({
      _id: data._id,
      pinned: !data?.pinned,
      position: itemList.indexOf(data),
    });

    itemList.forEach((item) => {
      if (item._id !== data._id && item.position !== itemList.indexOf(item)) {
        updatedItems.push({
          _id: item._id,
          position: itemList.indexOf(item),
        });
      }
    });

    return updatedItems;
  }

  getLastPinnedIndex(itemList: any[]) {
    let index: any;
    itemList.forEach((item: any) => {
      if (item.pinned && (typeof index !== "number" || item.position > index))
        index = item.position;
    });
    return index;
  }
}
