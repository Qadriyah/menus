"use client";
import React from "react";
import Image from "next/image";
import SelectInput from "@/app/componets/SelectInput";
import Button, { BtnThemeType } from "@/app/componets/Button";
import { TreeItemType } from "@/types/entities";
import { formatErrors } from "@/utils/helpers";
import Breadcrumb from "@/app/componets/Breadcrumb";
import Input from "@/app/componets/Input";
import { useFormik } from "formik";
import { createMenuItemValidationSchema } from "@/validation/menu";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createMenu, deleteMenu, getMenus, updateMenu } from "@/actions/menu";
import { CreateMenuResponseDto, GetMenusResponseDto } from "@/types/responses";
import { CreateMenuType } from "@/types/requests";
import Suspense from "@/app/componets/Suspense";
import Loader from "@/app/componets/Loader";
import MenuItems from "@/app/componets/MenuItems";
import ConfirmModal from "@/app/componets/ConfirmModal";

const Menus = () => {
  const [selectedItem, setSelectedItem] = React.useState("System Management");
  const [menus, setMenus] = React.useState<TreeItemType[]>([]);
  const [selectedMenu, setSelectedMenu] = React.useState<TreeItemType | null>(
    null
  );
  const [showModel, setShowModel] = React.useState(false);
  const [active, setActive] = React.useState<{
    expand: BtnThemeType;
    collapse: BtnThemeType;
  }>({
    expand: "dark",
    collapse: "clear",
  });

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["get-menus"],
    queryFn: () => getMenus<GetMenusResponseDto>("/api/menus"),
  });

  const createMenuMutation = useMutation({
    mutationKey: ["create-menu"],
    mutationFn: (formData: CreateMenuType) =>
      createMenu<CreateMenuResponseDto>("/api/menus", formData),
  });

  const deleteMenuMutation = useMutation({
    mutationKey: ["delete-menu"],
    mutationFn: () =>
      deleteMenu<CreateMenuResponseDto>(`/api/menus/${selectedMenu?.id}`),
  });

  const updateMenuMutation = useMutation({
    mutationKey: ["update-menu"],
    mutationFn: (formData: CreateMenuType) =>
      updateMenu<CreateMenuResponseDto>(
        `/api/menus/${selectedMenu?.id}`,
        formData
      ),
  });

  const onExpand = () => {
    setActive(() => ({
      expand: "dark",
      collapse: "clear",
    }));

    const elems = document.getElementsByClassName("arrow-down");
    for (let i = 0; i < elems.length; i++) {
      elems[i]?.classList?.add("rotate-90");
    }

    const children = document.getElementsByClassName("collapsible");
    for (let i = 0; i < children.length; i++) {
      const content = children[i].nextElementSibling as HTMLElement;
      content?.classList?.replace("collapsed", "content");
    }
  };

  const onCollapse = () => {
    setActive(() => ({
      expand: "clear",
      collapse: "dark",
    }));

    const elems = document.getElementsByClassName("arrow-down");
    for (let i = 0; i < elems.length; i++) {
      elems[i]?.classList?.remove("rotate-90");
    }

    const children = document.getElementsByClassName("collapsible");
    for (let i = 0; i < children.length; i++) {
      const content = children[i].nextElementSibling as HTMLElement;
      content?.classList?.replace("content", "collapsed");
    }
  };

  const onAddChild = (item: TreeItemType) => {
    setSelectedMenu(null);
    formik.setValues({
      depth: +"",
      name: "",
      parent: item.id,
    });
  };

  const onEdit = (item: TreeItemType) => {
    setSelectedMenu(item);
    formik.setValues({
      depth: item.depth,
      name: item.name,
      parent: +item.parent!,
    });
  };

  const confirmDeleteChild = async () => {
    const { error } = await deleteMenuMutation.mutateAsync();
    if (error) {
      return;
    }
    refetch();
    setShowModel(false);
  };

  const handleSubmit = async (values: CreateMenuType) => {
    const request = {
      ...values,
      parent: Number(values.parent) ? values.parent : null,
    };
    const { errors, menu } = !selectedMenu
      ? await createMenuMutation.mutateAsync(request)
      : await updateMenuMutation.mutateAsync(request);
    if (errors) {
      formik.setErrors(formatErrors(errors));
      return;
    }
    setSelectedMenu(menu!);
    refetch();
  };

  const formik = useFormik({
    initialValues: {
      depth: +"",
      parent: +"",
      name: "",
    },
    validateOnChange: true,
    validationSchema: createMenuItemValidationSchema,
    onSubmit: handleSubmit,
  });

  React.useEffect(() => {
    setMenus(data?.menus || []);
  }, [data?.menus]);

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-10">
      <div className="flex flex-col gap-10">
        <Breadcrumb icon="/images/folder.png" routes={["Menus"]} />
        <div className="gap-5 items-center hidden md:flex">
          <Image
            src="/images/icon-title.png"
            width={52}
            height={52}
            alt="icon"
          />
          <p className="text-[32px] font-extrabold">Menus</p>
        </div>
        <div>
          <SelectInput
            label="Menu"
            onChange={(event) => setSelectedItem(event.target.value)}
            value={selectedItem}
          >
            <option value="66f8fa922a4ba3abe0386072">System Management</option>
          </SelectInput>
        </div>
        <div className="flex gap-3">
          <div className="flex-shrink-0">
            <Button theme={active.expand} onClick={onExpand}>
              Expand All
            </Button>
          </div>
          <div className="flex-shrink-0">
            <Button theme={active.collapse} onClick={onCollapse}>
              Collapse All
            </Button>
          </div>
        </div>
        <div className="pl-5">
          <Suspense loading={isLoading} fallback={<Loader color="#000" />}>
            <MenuItems
              data={menus}
              onAddChild={onAddChild}
              onEdit={onEdit}
              onDeleteChild={(item) => {
                setSelectedMenu(item);
                setShowModel(true);
              }}
            />
          </Suspense>
        </div>
      </div>
      <div className="flex flex-col gap-5 mt-20 md:mt-64">
        <Input
          label="Menu ID"
          value={selectedMenu?.id || ""}
          disabled
          onChange={() => {}}
        />
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-5">
          <Input
            label="Depth"
            type="number"
            placeholder="3"
            name="depth"
            value={formik.values.depth}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.depth && formik.errors.depth
                ? formik.errors.depth
                : ""
            }
          />
          <SelectInput
            label="Parent Data"
            name="parent"
            value={formik.values.parent}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled
            error={
              formik.touched.parent && formik.errors.parent
                ? formik.errors.parent
                : ""
            }
          >
            <option value=""></option>
            {menus.map((item) => (
              <option value={item.id} key={item.id}>
                {item.name}
              </option>
            ))}
          </SelectInput>
          <Input
            label="Name"
            placeholder="Systems"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.name && formik.errors.name
                ? formik.errors.name
                : ""
            }
          />
          <Button
            theme="primary"
            type="submit"
            loading={
              createMenuMutation.isPending || updateMenuMutation.isPending
            }
          >
            Save
          </Button>
        </form>
      </div>
      {showModel && (
        <ConfirmModal
          show={true}
          loading={deleteMenuMutation.isPending}
          onClose={() => {
            setSelectedMenu(null);
            formik.resetForm();
            setShowModel(false);
          }}
          onConfirm={confirmDeleteChild}
        />
      )}
    </section>
  );
};

export default Menus;
