import TextNode from "../components/nodes/TextNode";
import { type ComponentType } from "react";

export type TextNodeData = {
  label: string;
};

export type NodeConfig = {
  label: string;
  category: string;
  defaultData: { label: string };
  component: ComponentType<any>;
};

export const nodeRegistry = {
  textNode: {
    label: "Text Message",
    category: "Messages",
    defaultData: {
      label: "Send a message...",
    },
    component: TextNode,
  },
} satisfies Record<string, NodeConfig>;

export type NodeType = keyof typeof nodeRegistry;