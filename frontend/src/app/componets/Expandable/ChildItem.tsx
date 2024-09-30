import React from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import SmallButton from "../Buttons/SmallButton";
import { TreeItemType } from "@/types/entities";

type IProps = {
  item: TreeItemType;
  onAddChild: (item: TreeItemType) => void;
  onDeleteChild: (item: TreeItemType) => void;
  onEdit: (item: TreeItemType) => void;
};

const ChildItem: React.FC<IProps> = ({
  item,
  onAddChild,
  onDeleteChild,
  onEdit,
}) => {
  return (
    <div className="flex cursor-pointer gap-3 items-center hover:font-bold menu-item">
      <div className="bg-black -ml-[40px] w-[20px] h-[1px]"></div>
      <div onClick={() => onEdit(item)}>{item.name}</div>
      <div className="gap-2 action-buttons">
        <SmallButton
          theme="primary"
          icon={<FaPlus onClick={() => onAddChild(item)} />}
        />
        <SmallButton
          theme="danger"
          icon={<FaRegTrashAlt />}
          onClick={() => onDeleteChild(item)}
        />
      </div>
    </div>
  );
};

export default ChildItem;
