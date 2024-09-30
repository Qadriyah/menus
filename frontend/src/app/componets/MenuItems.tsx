import React from "react";
import { TreeItemType } from "@/types/entities";
import { generateTree } from "@/utils/helpers";
import ParentItem from "./Expandable/ParentItem";
import ChildItem from "./Expandable/ChildItem";

type IProps = {
  data: TreeItemType[];
  onAddChild: (item: TreeItemType) => void;
  onDeleteChild: (item: TreeItemType) => void;
  onEdit: (item: TreeItemType) => void;
};

const MenuItems: React.FC<IProps> = ({
  data,
  onAddChild,
  onDeleteChild,
  onEdit,
}) => {
  const items = React.useMemo(() => generateTree(data || []), [data]);

  const renderNodes = (tree: TreeItemType[]) => {
    return (
      <ul className="my-2 list border-l border-l-black content">
        {tree.map((node) => (
          <li key={node.id} className="my-2">
            {(node.children && node.children?.length > 0) || !node.parent ? (
              <ParentItem
                item={node}
                onAddChild={onAddChild}
                onDeleteChild={onDeleteChild}
                onEdit={onEdit}
              />
            ) : (
              <ChildItem
                item={node}
                onAddChild={onAddChild}
                onDeleteChild={onDeleteChild}
                onEdit={onEdit}
              />
            )}
            {node.children && renderNodes(node.children)}
          </li>
        ))}
      </ul>
    );
  };

  return <div>{renderNodes(items)}</div>;
};

export default MenuItems;
