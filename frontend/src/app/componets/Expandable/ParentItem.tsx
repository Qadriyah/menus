import React from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { TreeItemType } from "@/types/entities";
import SmallButton from "../Buttons/SmallButton";

type IProps = {
  item: TreeItemType;
  onAddChild: (item: TreeItemType) => void;
  onDeleteChild: (item: TreeItemType) => void;
  onEdit: (item: TreeItemType) => void;
};

const ParentItem: React.FC<IProps> = ({
  item,
  onAddChild,
  onDeleteChild,
  onEdit,
}) => {
  const handleClick = () => {
    const elem = document.getElementById(item.name);
    if (elem?.classList?.contains("rotate-90")) {
      elem.classList.remove("rotate-90");
    } else {
      elem?.classList?.add("rotate-90");
    }

    const children = document.getElementsByClassName(String(item.id));
    for (let i = 0; i < children.length; i++) {
      const content = children[i].nextElementSibling;
      if (content instanceof HTMLElement) {
        if (content.classList.contains("collapsed")) {
          content.classList.remove("collapsed");
        } else {
          content.classList.add("collapsed");
        }
      }
    }
  };

  return (
    <div
      className={`flex cursor-pointer gap-3 items-center hover:font-bold collapsible menu-item ${item.id}`}
    >
      <div className="bg-black -ml-[40px] w-[20px] h-[1px]"></div>
      <div
        className="duration-300 -ml-1 arrow-down rotate-90"
        id={item.name}
        onClick={handleClick}
      >
        <span>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.6343 12.5657L8.45001 16.75C8.0358 17.1642 8.0358 17.8358 8.45001 18.25C8.86423 18.6642 9.5358 18.6642 9.95001 18.25L15.4929 12.7071C15.8834 12.3166 15.8834 11.6834 15.4929 11.2929L9.95001 5.75C9.5358 5.33579 8.86423 5.33579 8.45001 5.75C8.0358 6.16421 8.0358 6.83579 8.45001 7.25L12.6343 11.4343C12.9467 11.7467 12.9467 12.2533 12.6343 12.5657Z"
              fill="currentColor"
            />
          </svg>
        </span>
      </div>
      <p onClick={() => onEdit(item)}>{item.name}</p>
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

export default ParentItem;
