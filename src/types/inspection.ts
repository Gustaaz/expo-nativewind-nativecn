import { inspectionSheetSchema } from "@/schemas/inspection-schema";
import { z } from "zod";

export type InspectionSheet = z.infer<typeof inspectionSheetSchema>