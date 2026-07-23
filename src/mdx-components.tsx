import type { MDXComponents } from "mdx/types";
import { EngineDiagram } from "@/components/interactive/EngineDiagram";
import { StringInStringOut } from "@/components/interactive/StringInStringOut";
import { Tokenizer } from "@/components/interactive/Tokenizer";
import { TrainingProgression } from "@/components/interactive/TrainingProgression";
import { MultiplicationLab } from "@/components/interactive/MultiplicationLab";
import { Grounding } from "@/components/interactive/Grounding";
import { ContextWindow } from "@/components/interactive/ContextWindow";
import { ContextFill } from "@/components/interactive/ContextFill";
import { Memory } from "@/components/interactive/Memory";
import { ToolCategories } from "@/components/interactive/ToolCategories";
import { RetrievalTradeoff } from "@/components/interactive/RetrievalTradeoff";
import { RagPipeline } from "@/components/interactive/RagPipeline";
import { ApiHandshake } from "@/components/interactive/ApiHandshake";
import { ApiTools } from "@/components/interactive/ApiTools";
import { HarvardAtlas } from "@/components/HarvardAtlas";
import { Term } from "@/components/Term";

// Registered globally so .mdx files can use these as bare tags (no import).
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    EngineDiagram,
    StringInStringOut,
    Tokenizer,
    TrainingProgression,
    MultiplicationLab,
    Grounding,
    ContextWindow,
    ContextFill,
    Memory,
    ToolCategories,
    RetrievalTradeoff,
    RagPipeline,
    ApiHandshake,
    ApiTools,
    HarvardAtlas,
    Term,
  };
}
