import { TreeItemType } from "@/types/entities";
import { FieldError } from "@/types/responses";

export const generateTree = (data: TreeItemType[]) => {
  data.forEach((node) => {
    if (!node.parent) {
      return;
    }

    const parentIndex = data.findIndex((el) => el.id === node.parent);
    if (!data[parentIndex]?.children) {
      data[parentIndex].children = [node];
    } else {
      const child = data[parentIndex].children.find((el) => el.id === node.id);
      if (!child) {
        data[parentIndex].children.push(node);
      }
    }
  });

  return data.filter((root) => !root.parent);
};

export const formatErrors = (errors: FieldError[]) => {
  return Object.assign(
    {},
    ...errors.map((err) => ({
      [err.field]: err.message,
    }))
  );
};
