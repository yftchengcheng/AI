import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type MarketplaceToolModel = runtime.Types.Result.DefaultSelection<Prisma.$MarketplaceToolPayload>;
export type AggregateMarketplaceTool = {
    _count: MarketplaceToolCountAggregateOutputType | null;
    _avg: MarketplaceToolAvgAggregateOutputType | null;
    _sum: MarketplaceToolSumAggregateOutputType | null;
    _min: MarketplaceToolMinAggregateOutputType | null;
    _max: MarketplaceToolMaxAggregateOutputType | null;
};
export type MarketplaceToolAvgAggregateOutputType = {
    downloads: number | null;
    rating: number | null;
};
export type MarketplaceToolSumAggregateOutputType = {
    downloads: number | null;
    rating: number | null;
};
export type MarketplaceToolMinAggregateOutputType = {
    id: string | null;
    projectId: string | null;
    userId: string | null;
    name: string | null;
    description: string | null;
    category: $Enums.ToolType | null;
    downloads: number | null;
    rating: number | null;
    version: string | null;
    status: $Enums.MarketStatus | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type MarketplaceToolMaxAggregateOutputType = {
    id: string | null;
    projectId: string | null;
    userId: string | null;
    name: string | null;
    description: string | null;
    category: $Enums.ToolType | null;
    downloads: number | null;
    rating: number | null;
    version: string | null;
    status: $Enums.MarketStatus | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type MarketplaceToolCountAggregateOutputType = {
    id: number;
    projectId: number;
    userId: number;
    name: number;
    description: number;
    category: number;
    tags: number;
    downloads: number;
    rating: number;
    version: number;
    status: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type MarketplaceToolAvgAggregateInputType = {
    downloads?: true;
    rating?: true;
};
export type MarketplaceToolSumAggregateInputType = {
    downloads?: true;
    rating?: true;
};
export type MarketplaceToolMinAggregateInputType = {
    id?: true;
    projectId?: true;
    userId?: true;
    name?: true;
    description?: true;
    category?: true;
    downloads?: true;
    rating?: true;
    version?: true;
    status?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type MarketplaceToolMaxAggregateInputType = {
    id?: true;
    projectId?: true;
    userId?: true;
    name?: true;
    description?: true;
    category?: true;
    downloads?: true;
    rating?: true;
    version?: true;
    status?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type MarketplaceToolCountAggregateInputType = {
    id?: true;
    projectId?: true;
    userId?: true;
    name?: true;
    description?: true;
    category?: true;
    tags?: true;
    downloads?: true;
    rating?: true;
    version?: true;
    status?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type MarketplaceToolAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.MarketplaceToolWhereInput;
    orderBy?: Prisma.MarketplaceToolOrderByWithRelationInput | Prisma.MarketplaceToolOrderByWithRelationInput[];
    cursor?: Prisma.MarketplaceToolWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | MarketplaceToolCountAggregateInputType;
    _avg?: MarketplaceToolAvgAggregateInputType;
    _sum?: MarketplaceToolSumAggregateInputType;
    _min?: MarketplaceToolMinAggregateInputType;
    _max?: MarketplaceToolMaxAggregateInputType;
};
export type GetMarketplaceToolAggregateType<T extends MarketplaceToolAggregateArgs> = {
    [P in keyof T & keyof AggregateMarketplaceTool]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateMarketplaceTool[P]> : Prisma.GetScalarType<T[P], AggregateMarketplaceTool[P]>;
};
export type MarketplaceToolGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.MarketplaceToolWhereInput;
    orderBy?: Prisma.MarketplaceToolOrderByWithAggregationInput | Prisma.MarketplaceToolOrderByWithAggregationInput[];
    by: Prisma.MarketplaceToolScalarFieldEnum[] | Prisma.MarketplaceToolScalarFieldEnum;
    having?: Prisma.MarketplaceToolScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: MarketplaceToolCountAggregateInputType | true;
    _avg?: MarketplaceToolAvgAggregateInputType;
    _sum?: MarketplaceToolSumAggregateInputType;
    _min?: MarketplaceToolMinAggregateInputType;
    _max?: MarketplaceToolMaxAggregateInputType;
};
export type MarketplaceToolGroupByOutputType = {
    id: string;
    projectId: string;
    userId: string;
    name: string;
    description: string;
    category: $Enums.ToolType;
    tags: string[];
    downloads: number;
    rating: number;
    version: string;
    status: $Enums.MarketStatus;
    createdAt: Date;
    updatedAt: Date;
    _count: MarketplaceToolCountAggregateOutputType | null;
    _avg: MarketplaceToolAvgAggregateOutputType | null;
    _sum: MarketplaceToolSumAggregateOutputType | null;
    _min: MarketplaceToolMinAggregateOutputType | null;
    _max: MarketplaceToolMaxAggregateOutputType | null;
};
export type GetMarketplaceToolGroupByPayload<T extends MarketplaceToolGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<MarketplaceToolGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof MarketplaceToolGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], MarketplaceToolGroupByOutputType[P]> : Prisma.GetScalarType<T[P], MarketplaceToolGroupByOutputType[P]>;
}>>;
export type MarketplaceToolWhereInput = {
    AND?: Prisma.MarketplaceToolWhereInput | Prisma.MarketplaceToolWhereInput[];
    OR?: Prisma.MarketplaceToolWhereInput[];
    NOT?: Prisma.MarketplaceToolWhereInput | Prisma.MarketplaceToolWhereInput[];
    id?: Prisma.StringFilter<"MarketplaceTool"> | string;
    projectId?: Prisma.StringFilter<"MarketplaceTool"> | string;
    userId?: Prisma.StringFilter<"MarketplaceTool"> | string;
    name?: Prisma.StringFilter<"MarketplaceTool"> | string;
    description?: Prisma.StringFilter<"MarketplaceTool"> | string;
    category?: Prisma.EnumToolTypeFilter<"MarketplaceTool"> | $Enums.ToolType;
    tags?: Prisma.StringNullableListFilter<"MarketplaceTool">;
    downloads?: Prisma.IntFilter<"MarketplaceTool"> | number;
    rating?: Prisma.FloatFilter<"MarketplaceTool"> | number;
    version?: Prisma.StringFilter<"MarketplaceTool"> | string;
    status?: Prisma.EnumMarketStatusFilter<"MarketplaceTool"> | $Enums.MarketStatus;
    createdAt?: Prisma.DateTimeFilter<"MarketplaceTool"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"MarketplaceTool"> | Date | string;
    project?: Prisma.XOR<Prisma.ProjectScalarRelationFilter, Prisma.ProjectWhereInput>;
};
export type MarketplaceToolOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    projectId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    category?: Prisma.SortOrder;
    tags?: Prisma.SortOrder;
    downloads?: Prisma.SortOrder;
    rating?: Prisma.SortOrder;
    version?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    project?: Prisma.ProjectOrderByWithRelationInput;
};
export type MarketplaceToolWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    projectId?: string;
    AND?: Prisma.MarketplaceToolWhereInput | Prisma.MarketplaceToolWhereInput[];
    OR?: Prisma.MarketplaceToolWhereInput[];
    NOT?: Prisma.MarketplaceToolWhereInput | Prisma.MarketplaceToolWhereInput[];
    userId?: Prisma.StringFilter<"MarketplaceTool"> | string;
    name?: Prisma.StringFilter<"MarketplaceTool"> | string;
    description?: Prisma.StringFilter<"MarketplaceTool"> | string;
    category?: Prisma.EnumToolTypeFilter<"MarketplaceTool"> | $Enums.ToolType;
    tags?: Prisma.StringNullableListFilter<"MarketplaceTool">;
    downloads?: Prisma.IntFilter<"MarketplaceTool"> | number;
    rating?: Prisma.FloatFilter<"MarketplaceTool"> | number;
    version?: Prisma.StringFilter<"MarketplaceTool"> | string;
    status?: Prisma.EnumMarketStatusFilter<"MarketplaceTool"> | $Enums.MarketStatus;
    createdAt?: Prisma.DateTimeFilter<"MarketplaceTool"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"MarketplaceTool"> | Date | string;
    project?: Prisma.XOR<Prisma.ProjectScalarRelationFilter, Prisma.ProjectWhereInput>;
}, "id" | "projectId">;
export type MarketplaceToolOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    projectId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    category?: Prisma.SortOrder;
    tags?: Prisma.SortOrder;
    downloads?: Prisma.SortOrder;
    rating?: Prisma.SortOrder;
    version?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.MarketplaceToolCountOrderByAggregateInput;
    _avg?: Prisma.MarketplaceToolAvgOrderByAggregateInput;
    _max?: Prisma.MarketplaceToolMaxOrderByAggregateInput;
    _min?: Prisma.MarketplaceToolMinOrderByAggregateInput;
    _sum?: Prisma.MarketplaceToolSumOrderByAggregateInput;
};
export type MarketplaceToolScalarWhereWithAggregatesInput = {
    AND?: Prisma.MarketplaceToolScalarWhereWithAggregatesInput | Prisma.MarketplaceToolScalarWhereWithAggregatesInput[];
    OR?: Prisma.MarketplaceToolScalarWhereWithAggregatesInput[];
    NOT?: Prisma.MarketplaceToolScalarWhereWithAggregatesInput | Prisma.MarketplaceToolScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"MarketplaceTool"> | string;
    projectId?: Prisma.StringWithAggregatesFilter<"MarketplaceTool"> | string;
    userId?: Prisma.StringWithAggregatesFilter<"MarketplaceTool"> | string;
    name?: Prisma.StringWithAggregatesFilter<"MarketplaceTool"> | string;
    description?: Prisma.StringWithAggregatesFilter<"MarketplaceTool"> | string;
    category?: Prisma.EnumToolTypeWithAggregatesFilter<"MarketplaceTool"> | $Enums.ToolType;
    tags?: Prisma.StringNullableListFilter<"MarketplaceTool">;
    downloads?: Prisma.IntWithAggregatesFilter<"MarketplaceTool"> | number;
    rating?: Prisma.FloatWithAggregatesFilter<"MarketplaceTool"> | number;
    version?: Prisma.StringWithAggregatesFilter<"MarketplaceTool"> | string;
    status?: Prisma.EnumMarketStatusWithAggregatesFilter<"MarketplaceTool"> | $Enums.MarketStatus;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"MarketplaceTool"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"MarketplaceTool"> | Date | string;
};
export type MarketplaceToolCreateInput = {
    id?: string;
    userId: string;
    name: string;
    description: string;
    category: $Enums.ToolType;
    tags?: Prisma.MarketplaceToolCreatetagsInput | string[];
    downloads?: number;
    rating?: number;
    version?: string;
    status?: $Enums.MarketStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    project: Prisma.ProjectCreateNestedOneWithoutMarketplaceToolInput;
};
export type MarketplaceToolUncheckedCreateInput = {
    id?: string;
    projectId: string;
    userId: string;
    name: string;
    description: string;
    category: $Enums.ToolType;
    tags?: Prisma.MarketplaceToolCreatetagsInput | string[];
    downloads?: number;
    rating?: number;
    version?: string;
    status?: $Enums.MarketStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type MarketplaceToolUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    category?: Prisma.EnumToolTypeFieldUpdateOperationsInput | $Enums.ToolType;
    tags?: Prisma.MarketplaceToolUpdatetagsInput | string[];
    downloads?: Prisma.IntFieldUpdateOperationsInput | number;
    rating?: Prisma.FloatFieldUpdateOperationsInput | number;
    version?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumMarketStatusFieldUpdateOperationsInput | $Enums.MarketStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    project?: Prisma.ProjectUpdateOneRequiredWithoutMarketplaceToolNestedInput;
};
export type MarketplaceToolUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    projectId?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    category?: Prisma.EnumToolTypeFieldUpdateOperationsInput | $Enums.ToolType;
    tags?: Prisma.MarketplaceToolUpdatetagsInput | string[];
    downloads?: Prisma.IntFieldUpdateOperationsInput | number;
    rating?: Prisma.FloatFieldUpdateOperationsInput | number;
    version?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumMarketStatusFieldUpdateOperationsInput | $Enums.MarketStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type MarketplaceToolCreateManyInput = {
    id?: string;
    projectId: string;
    userId: string;
    name: string;
    description: string;
    category: $Enums.ToolType;
    tags?: Prisma.MarketplaceToolCreatetagsInput | string[];
    downloads?: number;
    rating?: number;
    version?: string;
    status?: $Enums.MarketStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type MarketplaceToolUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    category?: Prisma.EnumToolTypeFieldUpdateOperationsInput | $Enums.ToolType;
    tags?: Prisma.MarketplaceToolUpdatetagsInput | string[];
    downloads?: Prisma.IntFieldUpdateOperationsInput | number;
    rating?: Prisma.FloatFieldUpdateOperationsInput | number;
    version?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumMarketStatusFieldUpdateOperationsInput | $Enums.MarketStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type MarketplaceToolUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    projectId?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    category?: Prisma.EnumToolTypeFieldUpdateOperationsInput | $Enums.ToolType;
    tags?: Prisma.MarketplaceToolUpdatetagsInput | string[];
    downloads?: Prisma.IntFieldUpdateOperationsInput | number;
    rating?: Prisma.FloatFieldUpdateOperationsInput | number;
    version?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumMarketStatusFieldUpdateOperationsInput | $Enums.MarketStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type MarketplaceToolNullableScalarRelationFilter = {
    is?: Prisma.MarketplaceToolWhereInput | null;
    isNot?: Prisma.MarketplaceToolWhereInput | null;
};
export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel> | null;
    has?: string | Prisma.StringFieldRefInput<$PrismaModel> | null;
    hasEvery?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    hasSome?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    isEmpty?: boolean;
};
export type MarketplaceToolCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    projectId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    category?: Prisma.SortOrder;
    tags?: Prisma.SortOrder;
    downloads?: Prisma.SortOrder;
    rating?: Prisma.SortOrder;
    version?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type MarketplaceToolAvgOrderByAggregateInput = {
    downloads?: Prisma.SortOrder;
    rating?: Prisma.SortOrder;
};
export type MarketplaceToolMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    projectId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    category?: Prisma.SortOrder;
    downloads?: Prisma.SortOrder;
    rating?: Prisma.SortOrder;
    version?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type MarketplaceToolMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    projectId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    category?: Prisma.SortOrder;
    downloads?: Prisma.SortOrder;
    rating?: Prisma.SortOrder;
    version?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type MarketplaceToolSumOrderByAggregateInput = {
    downloads?: Prisma.SortOrder;
    rating?: Prisma.SortOrder;
};
export type MarketplaceToolCreateNestedOneWithoutProjectInput = {
    create?: Prisma.XOR<Prisma.MarketplaceToolCreateWithoutProjectInput, Prisma.MarketplaceToolUncheckedCreateWithoutProjectInput>;
    connectOrCreate?: Prisma.MarketplaceToolCreateOrConnectWithoutProjectInput;
    connect?: Prisma.MarketplaceToolWhereUniqueInput;
};
export type MarketplaceToolUncheckedCreateNestedOneWithoutProjectInput = {
    create?: Prisma.XOR<Prisma.MarketplaceToolCreateWithoutProjectInput, Prisma.MarketplaceToolUncheckedCreateWithoutProjectInput>;
    connectOrCreate?: Prisma.MarketplaceToolCreateOrConnectWithoutProjectInput;
    connect?: Prisma.MarketplaceToolWhereUniqueInput;
};
export type MarketplaceToolUpdateOneWithoutProjectNestedInput = {
    create?: Prisma.XOR<Prisma.MarketplaceToolCreateWithoutProjectInput, Prisma.MarketplaceToolUncheckedCreateWithoutProjectInput>;
    connectOrCreate?: Prisma.MarketplaceToolCreateOrConnectWithoutProjectInput;
    upsert?: Prisma.MarketplaceToolUpsertWithoutProjectInput;
    disconnect?: Prisma.MarketplaceToolWhereInput | boolean;
    delete?: Prisma.MarketplaceToolWhereInput | boolean;
    connect?: Prisma.MarketplaceToolWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.MarketplaceToolUpdateToOneWithWhereWithoutProjectInput, Prisma.MarketplaceToolUpdateWithoutProjectInput>, Prisma.MarketplaceToolUncheckedUpdateWithoutProjectInput>;
};
export type MarketplaceToolUncheckedUpdateOneWithoutProjectNestedInput = {
    create?: Prisma.XOR<Prisma.MarketplaceToolCreateWithoutProjectInput, Prisma.MarketplaceToolUncheckedCreateWithoutProjectInput>;
    connectOrCreate?: Prisma.MarketplaceToolCreateOrConnectWithoutProjectInput;
    upsert?: Prisma.MarketplaceToolUpsertWithoutProjectInput;
    disconnect?: Prisma.MarketplaceToolWhereInput | boolean;
    delete?: Prisma.MarketplaceToolWhereInput | boolean;
    connect?: Prisma.MarketplaceToolWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.MarketplaceToolUpdateToOneWithWhereWithoutProjectInput, Prisma.MarketplaceToolUpdateWithoutProjectInput>, Prisma.MarketplaceToolUncheckedUpdateWithoutProjectInput>;
};
export type MarketplaceToolCreatetagsInput = {
    set: string[];
};
export type MarketplaceToolUpdatetagsInput = {
    set?: string[];
    push?: string | string[];
};
export type IntFieldUpdateOperationsInput = {
    set?: number;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type FloatFieldUpdateOperationsInput = {
    set?: number;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type EnumMarketStatusFieldUpdateOperationsInput = {
    set?: $Enums.MarketStatus;
};
export type MarketplaceToolCreateWithoutProjectInput = {
    id?: string;
    userId: string;
    name: string;
    description: string;
    category: $Enums.ToolType;
    tags?: Prisma.MarketplaceToolCreatetagsInput | string[];
    downloads?: number;
    rating?: number;
    version?: string;
    status?: $Enums.MarketStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type MarketplaceToolUncheckedCreateWithoutProjectInput = {
    id?: string;
    userId: string;
    name: string;
    description: string;
    category: $Enums.ToolType;
    tags?: Prisma.MarketplaceToolCreatetagsInput | string[];
    downloads?: number;
    rating?: number;
    version?: string;
    status?: $Enums.MarketStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type MarketplaceToolCreateOrConnectWithoutProjectInput = {
    where: Prisma.MarketplaceToolWhereUniqueInput;
    create: Prisma.XOR<Prisma.MarketplaceToolCreateWithoutProjectInput, Prisma.MarketplaceToolUncheckedCreateWithoutProjectInput>;
};
export type MarketplaceToolUpsertWithoutProjectInput = {
    update: Prisma.XOR<Prisma.MarketplaceToolUpdateWithoutProjectInput, Prisma.MarketplaceToolUncheckedUpdateWithoutProjectInput>;
    create: Prisma.XOR<Prisma.MarketplaceToolCreateWithoutProjectInput, Prisma.MarketplaceToolUncheckedCreateWithoutProjectInput>;
    where?: Prisma.MarketplaceToolWhereInput;
};
export type MarketplaceToolUpdateToOneWithWhereWithoutProjectInput = {
    where?: Prisma.MarketplaceToolWhereInput;
    data: Prisma.XOR<Prisma.MarketplaceToolUpdateWithoutProjectInput, Prisma.MarketplaceToolUncheckedUpdateWithoutProjectInput>;
};
export type MarketplaceToolUpdateWithoutProjectInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    category?: Prisma.EnumToolTypeFieldUpdateOperationsInput | $Enums.ToolType;
    tags?: Prisma.MarketplaceToolUpdatetagsInput | string[];
    downloads?: Prisma.IntFieldUpdateOperationsInput | number;
    rating?: Prisma.FloatFieldUpdateOperationsInput | number;
    version?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumMarketStatusFieldUpdateOperationsInput | $Enums.MarketStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type MarketplaceToolUncheckedUpdateWithoutProjectInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    category?: Prisma.EnumToolTypeFieldUpdateOperationsInput | $Enums.ToolType;
    tags?: Prisma.MarketplaceToolUpdatetagsInput | string[];
    downloads?: Prisma.IntFieldUpdateOperationsInput | number;
    rating?: Prisma.FloatFieldUpdateOperationsInput | number;
    version?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumMarketStatusFieldUpdateOperationsInput | $Enums.MarketStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type MarketplaceToolSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    projectId?: boolean;
    userId?: boolean;
    name?: boolean;
    description?: boolean;
    category?: boolean;
    tags?: boolean;
    downloads?: boolean;
    rating?: boolean;
    version?: boolean;
    status?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    project?: boolean | Prisma.ProjectDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["marketplaceTool"]>;
export type MarketplaceToolSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    projectId?: boolean;
    userId?: boolean;
    name?: boolean;
    description?: boolean;
    category?: boolean;
    tags?: boolean;
    downloads?: boolean;
    rating?: boolean;
    version?: boolean;
    status?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    project?: boolean | Prisma.ProjectDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["marketplaceTool"]>;
export type MarketplaceToolSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    projectId?: boolean;
    userId?: boolean;
    name?: boolean;
    description?: boolean;
    category?: boolean;
    tags?: boolean;
    downloads?: boolean;
    rating?: boolean;
    version?: boolean;
    status?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    project?: boolean | Prisma.ProjectDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["marketplaceTool"]>;
export type MarketplaceToolSelectScalar = {
    id?: boolean;
    projectId?: boolean;
    userId?: boolean;
    name?: boolean;
    description?: boolean;
    category?: boolean;
    tags?: boolean;
    downloads?: boolean;
    rating?: boolean;
    version?: boolean;
    status?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type MarketplaceToolOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "projectId" | "userId" | "name" | "description" | "category" | "tags" | "downloads" | "rating" | "version" | "status" | "createdAt" | "updatedAt", ExtArgs["result"]["marketplaceTool"]>;
export type MarketplaceToolInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    project?: boolean | Prisma.ProjectDefaultArgs<ExtArgs>;
};
export type MarketplaceToolIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    project?: boolean | Prisma.ProjectDefaultArgs<ExtArgs>;
};
export type MarketplaceToolIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    project?: boolean | Prisma.ProjectDefaultArgs<ExtArgs>;
};
export type $MarketplaceToolPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "MarketplaceTool";
    objects: {
        project: Prisma.$ProjectPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        projectId: string;
        userId: string;
        name: string;
        description: string;
        category: $Enums.ToolType;
        tags: string[];
        downloads: number;
        rating: number;
        version: string;
        status: $Enums.MarketStatus;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["marketplaceTool"]>;
    composites: {};
};
export type MarketplaceToolGetPayload<S extends boolean | null | undefined | MarketplaceToolDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$MarketplaceToolPayload, S>;
export type MarketplaceToolCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<MarketplaceToolFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: MarketplaceToolCountAggregateInputType | true;
};
export interface MarketplaceToolDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['MarketplaceTool'];
        meta: {
            name: 'MarketplaceTool';
        };
    };
    findUnique<T extends MarketplaceToolFindUniqueArgs>(args: Prisma.SelectSubset<T, MarketplaceToolFindUniqueArgs<ExtArgs>>): Prisma.Prisma__MarketplaceToolClient<runtime.Types.Result.GetResult<Prisma.$MarketplaceToolPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends MarketplaceToolFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, MarketplaceToolFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__MarketplaceToolClient<runtime.Types.Result.GetResult<Prisma.$MarketplaceToolPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends MarketplaceToolFindFirstArgs>(args?: Prisma.SelectSubset<T, MarketplaceToolFindFirstArgs<ExtArgs>>): Prisma.Prisma__MarketplaceToolClient<runtime.Types.Result.GetResult<Prisma.$MarketplaceToolPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends MarketplaceToolFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, MarketplaceToolFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__MarketplaceToolClient<runtime.Types.Result.GetResult<Prisma.$MarketplaceToolPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends MarketplaceToolFindManyArgs>(args?: Prisma.SelectSubset<T, MarketplaceToolFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MarketplaceToolPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends MarketplaceToolCreateArgs>(args: Prisma.SelectSubset<T, MarketplaceToolCreateArgs<ExtArgs>>): Prisma.Prisma__MarketplaceToolClient<runtime.Types.Result.GetResult<Prisma.$MarketplaceToolPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends MarketplaceToolCreateManyArgs>(args?: Prisma.SelectSubset<T, MarketplaceToolCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends MarketplaceToolCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, MarketplaceToolCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MarketplaceToolPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends MarketplaceToolDeleteArgs>(args: Prisma.SelectSubset<T, MarketplaceToolDeleteArgs<ExtArgs>>): Prisma.Prisma__MarketplaceToolClient<runtime.Types.Result.GetResult<Prisma.$MarketplaceToolPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends MarketplaceToolUpdateArgs>(args: Prisma.SelectSubset<T, MarketplaceToolUpdateArgs<ExtArgs>>): Prisma.Prisma__MarketplaceToolClient<runtime.Types.Result.GetResult<Prisma.$MarketplaceToolPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends MarketplaceToolDeleteManyArgs>(args?: Prisma.SelectSubset<T, MarketplaceToolDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends MarketplaceToolUpdateManyArgs>(args: Prisma.SelectSubset<T, MarketplaceToolUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends MarketplaceToolUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, MarketplaceToolUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MarketplaceToolPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends MarketplaceToolUpsertArgs>(args: Prisma.SelectSubset<T, MarketplaceToolUpsertArgs<ExtArgs>>): Prisma.Prisma__MarketplaceToolClient<runtime.Types.Result.GetResult<Prisma.$MarketplaceToolPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends MarketplaceToolCountArgs>(args?: Prisma.Subset<T, MarketplaceToolCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], MarketplaceToolCountAggregateOutputType> : number>;
    aggregate<T extends MarketplaceToolAggregateArgs>(args: Prisma.Subset<T, MarketplaceToolAggregateArgs>): Prisma.PrismaPromise<GetMarketplaceToolAggregateType<T>>;
    groupBy<T extends MarketplaceToolGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: MarketplaceToolGroupByArgs['orderBy'];
    } : {
        orderBy?: MarketplaceToolGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, MarketplaceToolGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMarketplaceToolGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: MarketplaceToolFieldRefs;
}
export interface Prisma__MarketplaceToolClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    project<T extends Prisma.ProjectDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ProjectDefaultArgs<ExtArgs>>): Prisma.Prisma__ProjectClient<runtime.Types.Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface MarketplaceToolFieldRefs {
    readonly id: Prisma.FieldRef<"MarketplaceTool", 'String'>;
    readonly projectId: Prisma.FieldRef<"MarketplaceTool", 'String'>;
    readonly userId: Prisma.FieldRef<"MarketplaceTool", 'String'>;
    readonly name: Prisma.FieldRef<"MarketplaceTool", 'String'>;
    readonly description: Prisma.FieldRef<"MarketplaceTool", 'String'>;
    readonly category: Prisma.FieldRef<"MarketplaceTool", 'ToolType'>;
    readonly tags: Prisma.FieldRef<"MarketplaceTool", 'String[]'>;
    readonly downloads: Prisma.FieldRef<"MarketplaceTool", 'Int'>;
    readonly rating: Prisma.FieldRef<"MarketplaceTool", 'Float'>;
    readonly version: Prisma.FieldRef<"MarketplaceTool", 'String'>;
    readonly status: Prisma.FieldRef<"MarketplaceTool", 'MarketStatus'>;
    readonly createdAt: Prisma.FieldRef<"MarketplaceTool", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"MarketplaceTool", 'DateTime'>;
}
export type MarketplaceToolFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MarketplaceToolSelect<ExtArgs> | null;
    omit?: Prisma.MarketplaceToolOmit<ExtArgs> | null;
    include?: Prisma.MarketplaceToolInclude<ExtArgs> | null;
    where: Prisma.MarketplaceToolWhereUniqueInput;
};
export type MarketplaceToolFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MarketplaceToolSelect<ExtArgs> | null;
    omit?: Prisma.MarketplaceToolOmit<ExtArgs> | null;
    include?: Prisma.MarketplaceToolInclude<ExtArgs> | null;
    where: Prisma.MarketplaceToolWhereUniqueInput;
};
export type MarketplaceToolFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MarketplaceToolSelect<ExtArgs> | null;
    omit?: Prisma.MarketplaceToolOmit<ExtArgs> | null;
    include?: Prisma.MarketplaceToolInclude<ExtArgs> | null;
    where?: Prisma.MarketplaceToolWhereInput;
    orderBy?: Prisma.MarketplaceToolOrderByWithRelationInput | Prisma.MarketplaceToolOrderByWithRelationInput[];
    cursor?: Prisma.MarketplaceToolWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.MarketplaceToolScalarFieldEnum | Prisma.MarketplaceToolScalarFieldEnum[];
};
export type MarketplaceToolFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MarketplaceToolSelect<ExtArgs> | null;
    omit?: Prisma.MarketplaceToolOmit<ExtArgs> | null;
    include?: Prisma.MarketplaceToolInclude<ExtArgs> | null;
    where?: Prisma.MarketplaceToolWhereInput;
    orderBy?: Prisma.MarketplaceToolOrderByWithRelationInput | Prisma.MarketplaceToolOrderByWithRelationInput[];
    cursor?: Prisma.MarketplaceToolWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.MarketplaceToolScalarFieldEnum | Prisma.MarketplaceToolScalarFieldEnum[];
};
export type MarketplaceToolFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MarketplaceToolSelect<ExtArgs> | null;
    omit?: Prisma.MarketplaceToolOmit<ExtArgs> | null;
    include?: Prisma.MarketplaceToolInclude<ExtArgs> | null;
    where?: Prisma.MarketplaceToolWhereInput;
    orderBy?: Prisma.MarketplaceToolOrderByWithRelationInput | Prisma.MarketplaceToolOrderByWithRelationInput[];
    cursor?: Prisma.MarketplaceToolWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.MarketplaceToolScalarFieldEnum | Prisma.MarketplaceToolScalarFieldEnum[];
};
export type MarketplaceToolCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MarketplaceToolSelect<ExtArgs> | null;
    omit?: Prisma.MarketplaceToolOmit<ExtArgs> | null;
    include?: Prisma.MarketplaceToolInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.MarketplaceToolCreateInput, Prisma.MarketplaceToolUncheckedCreateInput>;
};
export type MarketplaceToolCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.MarketplaceToolCreateManyInput | Prisma.MarketplaceToolCreateManyInput[];
    skipDuplicates?: boolean;
};
export type MarketplaceToolCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MarketplaceToolSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.MarketplaceToolOmit<ExtArgs> | null;
    data: Prisma.MarketplaceToolCreateManyInput | Prisma.MarketplaceToolCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.MarketplaceToolIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type MarketplaceToolUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MarketplaceToolSelect<ExtArgs> | null;
    omit?: Prisma.MarketplaceToolOmit<ExtArgs> | null;
    include?: Prisma.MarketplaceToolInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.MarketplaceToolUpdateInput, Prisma.MarketplaceToolUncheckedUpdateInput>;
    where: Prisma.MarketplaceToolWhereUniqueInput;
};
export type MarketplaceToolUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.MarketplaceToolUpdateManyMutationInput, Prisma.MarketplaceToolUncheckedUpdateManyInput>;
    where?: Prisma.MarketplaceToolWhereInput;
    limit?: number;
};
export type MarketplaceToolUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MarketplaceToolSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.MarketplaceToolOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.MarketplaceToolUpdateManyMutationInput, Prisma.MarketplaceToolUncheckedUpdateManyInput>;
    where?: Prisma.MarketplaceToolWhereInput;
    limit?: number;
    include?: Prisma.MarketplaceToolIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type MarketplaceToolUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MarketplaceToolSelect<ExtArgs> | null;
    omit?: Prisma.MarketplaceToolOmit<ExtArgs> | null;
    include?: Prisma.MarketplaceToolInclude<ExtArgs> | null;
    where: Prisma.MarketplaceToolWhereUniqueInput;
    create: Prisma.XOR<Prisma.MarketplaceToolCreateInput, Prisma.MarketplaceToolUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.MarketplaceToolUpdateInput, Prisma.MarketplaceToolUncheckedUpdateInput>;
};
export type MarketplaceToolDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MarketplaceToolSelect<ExtArgs> | null;
    omit?: Prisma.MarketplaceToolOmit<ExtArgs> | null;
    include?: Prisma.MarketplaceToolInclude<ExtArgs> | null;
    where: Prisma.MarketplaceToolWhereUniqueInput;
};
export type MarketplaceToolDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.MarketplaceToolWhereInput;
    limit?: number;
};
export type MarketplaceToolDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MarketplaceToolSelect<ExtArgs> | null;
    omit?: Prisma.MarketplaceToolOmit<ExtArgs> | null;
    include?: Prisma.MarketplaceToolInclude<ExtArgs> | null;
};
