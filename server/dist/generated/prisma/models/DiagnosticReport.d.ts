import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type DiagnosticReportModel = runtime.Types.Result.DefaultSelection<Prisma.$DiagnosticReportPayload>;
export type AggregateDiagnosticReport = {
    _count: DiagnosticReportCountAggregateOutputType | null;
    _min: DiagnosticReportMinAggregateOutputType | null;
    _max: DiagnosticReportMaxAggregateOutputType | null;
};
export type DiagnosticReportMinAggregateOutputType = {
    id: string | null;
    userId: string | null;
    type: $Enums.DiagnosticType | null;
    input: string | null;
    status: $Enums.DiagnosticStatus | null;
    createdAt: Date | null;
};
export type DiagnosticReportMaxAggregateOutputType = {
    id: string | null;
    userId: string | null;
    type: $Enums.DiagnosticType | null;
    input: string | null;
    status: $Enums.DiagnosticStatus | null;
    createdAt: Date | null;
};
export type DiagnosticReportCountAggregateOutputType = {
    id: number;
    userId: number;
    type: number;
    input: number;
    result: number;
    status: number;
    createdAt: number;
    _all: number;
};
export type DiagnosticReportMinAggregateInputType = {
    id?: true;
    userId?: true;
    type?: true;
    input?: true;
    status?: true;
    createdAt?: true;
};
export type DiagnosticReportMaxAggregateInputType = {
    id?: true;
    userId?: true;
    type?: true;
    input?: true;
    status?: true;
    createdAt?: true;
};
export type DiagnosticReportCountAggregateInputType = {
    id?: true;
    userId?: true;
    type?: true;
    input?: true;
    result?: true;
    status?: true;
    createdAt?: true;
    _all?: true;
};
export type DiagnosticReportAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.DiagnosticReportWhereInput;
    orderBy?: Prisma.DiagnosticReportOrderByWithRelationInput | Prisma.DiagnosticReportOrderByWithRelationInput[];
    cursor?: Prisma.DiagnosticReportWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | DiagnosticReportCountAggregateInputType;
    _min?: DiagnosticReportMinAggregateInputType;
    _max?: DiagnosticReportMaxAggregateInputType;
};
export type GetDiagnosticReportAggregateType<T extends DiagnosticReportAggregateArgs> = {
    [P in keyof T & keyof AggregateDiagnosticReport]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateDiagnosticReport[P]> : Prisma.GetScalarType<T[P], AggregateDiagnosticReport[P]>;
};
export type DiagnosticReportGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.DiagnosticReportWhereInput;
    orderBy?: Prisma.DiagnosticReportOrderByWithAggregationInput | Prisma.DiagnosticReportOrderByWithAggregationInput[];
    by: Prisma.DiagnosticReportScalarFieldEnum[] | Prisma.DiagnosticReportScalarFieldEnum;
    having?: Prisma.DiagnosticReportScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: DiagnosticReportCountAggregateInputType | true;
    _min?: DiagnosticReportMinAggregateInputType;
    _max?: DiagnosticReportMaxAggregateInputType;
};
export type DiagnosticReportGroupByOutputType = {
    id: string;
    userId: string;
    type: $Enums.DiagnosticType;
    input: string;
    result: runtime.JsonValue | null;
    status: $Enums.DiagnosticStatus;
    createdAt: Date;
    _count: DiagnosticReportCountAggregateOutputType | null;
    _min: DiagnosticReportMinAggregateOutputType | null;
    _max: DiagnosticReportMaxAggregateOutputType | null;
};
export type GetDiagnosticReportGroupByPayload<T extends DiagnosticReportGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<DiagnosticReportGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof DiagnosticReportGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], DiagnosticReportGroupByOutputType[P]> : Prisma.GetScalarType<T[P], DiagnosticReportGroupByOutputType[P]>;
}>>;
export type DiagnosticReportWhereInput = {
    AND?: Prisma.DiagnosticReportWhereInput | Prisma.DiagnosticReportWhereInput[];
    OR?: Prisma.DiagnosticReportWhereInput[];
    NOT?: Prisma.DiagnosticReportWhereInput | Prisma.DiagnosticReportWhereInput[];
    id?: Prisma.StringFilter<"DiagnosticReport"> | string;
    userId?: Prisma.StringFilter<"DiagnosticReport"> | string;
    type?: Prisma.EnumDiagnosticTypeFilter<"DiagnosticReport"> | $Enums.DiagnosticType;
    input?: Prisma.StringFilter<"DiagnosticReport"> | string;
    result?: Prisma.JsonNullableFilter<"DiagnosticReport">;
    status?: Prisma.EnumDiagnosticStatusFilter<"DiagnosticReport"> | $Enums.DiagnosticStatus;
    createdAt?: Prisma.DateTimeFilter<"DiagnosticReport"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
};
export type DiagnosticReportOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    input?: Prisma.SortOrder;
    result?: Prisma.SortOrderInput | Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    user?: Prisma.UserOrderByWithRelationInput;
};
export type DiagnosticReportWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.DiagnosticReportWhereInput | Prisma.DiagnosticReportWhereInput[];
    OR?: Prisma.DiagnosticReportWhereInput[];
    NOT?: Prisma.DiagnosticReportWhereInput | Prisma.DiagnosticReportWhereInput[];
    userId?: Prisma.StringFilter<"DiagnosticReport"> | string;
    type?: Prisma.EnumDiagnosticTypeFilter<"DiagnosticReport"> | $Enums.DiagnosticType;
    input?: Prisma.StringFilter<"DiagnosticReport"> | string;
    result?: Prisma.JsonNullableFilter<"DiagnosticReport">;
    status?: Prisma.EnumDiagnosticStatusFilter<"DiagnosticReport"> | $Enums.DiagnosticStatus;
    createdAt?: Prisma.DateTimeFilter<"DiagnosticReport"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
}, "id">;
export type DiagnosticReportOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    input?: Prisma.SortOrder;
    result?: Prisma.SortOrderInput | Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.DiagnosticReportCountOrderByAggregateInput;
    _max?: Prisma.DiagnosticReportMaxOrderByAggregateInput;
    _min?: Prisma.DiagnosticReportMinOrderByAggregateInput;
};
export type DiagnosticReportScalarWhereWithAggregatesInput = {
    AND?: Prisma.DiagnosticReportScalarWhereWithAggregatesInput | Prisma.DiagnosticReportScalarWhereWithAggregatesInput[];
    OR?: Prisma.DiagnosticReportScalarWhereWithAggregatesInput[];
    NOT?: Prisma.DiagnosticReportScalarWhereWithAggregatesInput | Prisma.DiagnosticReportScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"DiagnosticReport"> | string;
    userId?: Prisma.StringWithAggregatesFilter<"DiagnosticReport"> | string;
    type?: Prisma.EnumDiagnosticTypeWithAggregatesFilter<"DiagnosticReport"> | $Enums.DiagnosticType;
    input?: Prisma.StringWithAggregatesFilter<"DiagnosticReport"> | string;
    result?: Prisma.JsonNullableWithAggregatesFilter<"DiagnosticReport">;
    status?: Prisma.EnumDiagnosticStatusWithAggregatesFilter<"DiagnosticReport"> | $Enums.DiagnosticStatus;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"DiagnosticReport"> | Date | string;
};
export type DiagnosticReportCreateInput = {
    id?: string;
    type: $Enums.DiagnosticType;
    input: string;
    result?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    status?: $Enums.DiagnosticStatus;
    createdAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutDiagnosticReportsInput;
};
export type DiagnosticReportUncheckedCreateInput = {
    id?: string;
    userId: string;
    type: $Enums.DiagnosticType;
    input: string;
    result?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    status?: $Enums.DiagnosticStatus;
    createdAt?: Date | string;
};
export type DiagnosticReportUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumDiagnosticTypeFieldUpdateOperationsInput | $Enums.DiagnosticType;
    input?: Prisma.StringFieldUpdateOperationsInput | string;
    result?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    status?: Prisma.EnumDiagnosticStatusFieldUpdateOperationsInput | $Enums.DiagnosticStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutDiagnosticReportsNestedInput;
};
export type DiagnosticReportUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumDiagnosticTypeFieldUpdateOperationsInput | $Enums.DiagnosticType;
    input?: Prisma.StringFieldUpdateOperationsInput | string;
    result?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    status?: Prisma.EnumDiagnosticStatusFieldUpdateOperationsInput | $Enums.DiagnosticStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DiagnosticReportCreateManyInput = {
    id?: string;
    userId: string;
    type: $Enums.DiagnosticType;
    input: string;
    result?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    status?: $Enums.DiagnosticStatus;
    createdAt?: Date | string;
};
export type DiagnosticReportUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumDiagnosticTypeFieldUpdateOperationsInput | $Enums.DiagnosticType;
    input?: Prisma.StringFieldUpdateOperationsInput | string;
    result?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    status?: Prisma.EnumDiagnosticStatusFieldUpdateOperationsInput | $Enums.DiagnosticStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DiagnosticReportUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumDiagnosticTypeFieldUpdateOperationsInput | $Enums.DiagnosticType;
    input?: Prisma.StringFieldUpdateOperationsInput | string;
    result?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    status?: Prisma.EnumDiagnosticStatusFieldUpdateOperationsInput | $Enums.DiagnosticStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DiagnosticReportListRelationFilter = {
    every?: Prisma.DiagnosticReportWhereInput;
    some?: Prisma.DiagnosticReportWhereInput;
    none?: Prisma.DiagnosticReportWhereInput;
};
export type DiagnosticReportOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type DiagnosticReportCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    input?: Prisma.SortOrder;
    result?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type DiagnosticReportMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    input?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type DiagnosticReportMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    input?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type DiagnosticReportCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.DiagnosticReportCreateWithoutUserInput, Prisma.DiagnosticReportUncheckedCreateWithoutUserInput> | Prisma.DiagnosticReportCreateWithoutUserInput[] | Prisma.DiagnosticReportUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.DiagnosticReportCreateOrConnectWithoutUserInput | Prisma.DiagnosticReportCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.DiagnosticReportCreateManyUserInputEnvelope;
    connect?: Prisma.DiagnosticReportWhereUniqueInput | Prisma.DiagnosticReportWhereUniqueInput[];
};
export type DiagnosticReportUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.DiagnosticReportCreateWithoutUserInput, Prisma.DiagnosticReportUncheckedCreateWithoutUserInput> | Prisma.DiagnosticReportCreateWithoutUserInput[] | Prisma.DiagnosticReportUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.DiagnosticReportCreateOrConnectWithoutUserInput | Prisma.DiagnosticReportCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.DiagnosticReportCreateManyUserInputEnvelope;
    connect?: Prisma.DiagnosticReportWhereUniqueInput | Prisma.DiagnosticReportWhereUniqueInput[];
};
export type DiagnosticReportUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.DiagnosticReportCreateWithoutUserInput, Prisma.DiagnosticReportUncheckedCreateWithoutUserInput> | Prisma.DiagnosticReportCreateWithoutUserInput[] | Prisma.DiagnosticReportUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.DiagnosticReportCreateOrConnectWithoutUserInput | Prisma.DiagnosticReportCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.DiagnosticReportUpsertWithWhereUniqueWithoutUserInput | Prisma.DiagnosticReportUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.DiagnosticReportCreateManyUserInputEnvelope;
    set?: Prisma.DiagnosticReportWhereUniqueInput | Prisma.DiagnosticReportWhereUniqueInput[];
    disconnect?: Prisma.DiagnosticReportWhereUniqueInput | Prisma.DiagnosticReportWhereUniqueInput[];
    delete?: Prisma.DiagnosticReportWhereUniqueInput | Prisma.DiagnosticReportWhereUniqueInput[];
    connect?: Prisma.DiagnosticReportWhereUniqueInput | Prisma.DiagnosticReportWhereUniqueInput[];
    update?: Prisma.DiagnosticReportUpdateWithWhereUniqueWithoutUserInput | Prisma.DiagnosticReportUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.DiagnosticReportUpdateManyWithWhereWithoutUserInput | Prisma.DiagnosticReportUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.DiagnosticReportScalarWhereInput | Prisma.DiagnosticReportScalarWhereInput[];
};
export type DiagnosticReportUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.DiagnosticReportCreateWithoutUserInput, Prisma.DiagnosticReportUncheckedCreateWithoutUserInput> | Prisma.DiagnosticReportCreateWithoutUserInput[] | Prisma.DiagnosticReportUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.DiagnosticReportCreateOrConnectWithoutUserInput | Prisma.DiagnosticReportCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.DiagnosticReportUpsertWithWhereUniqueWithoutUserInput | Prisma.DiagnosticReportUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.DiagnosticReportCreateManyUserInputEnvelope;
    set?: Prisma.DiagnosticReportWhereUniqueInput | Prisma.DiagnosticReportWhereUniqueInput[];
    disconnect?: Prisma.DiagnosticReportWhereUniqueInput | Prisma.DiagnosticReportWhereUniqueInput[];
    delete?: Prisma.DiagnosticReportWhereUniqueInput | Prisma.DiagnosticReportWhereUniqueInput[];
    connect?: Prisma.DiagnosticReportWhereUniqueInput | Prisma.DiagnosticReportWhereUniqueInput[];
    update?: Prisma.DiagnosticReportUpdateWithWhereUniqueWithoutUserInput | Prisma.DiagnosticReportUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.DiagnosticReportUpdateManyWithWhereWithoutUserInput | Prisma.DiagnosticReportUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.DiagnosticReportScalarWhereInput | Prisma.DiagnosticReportScalarWhereInput[];
};
export type EnumDiagnosticTypeFieldUpdateOperationsInput = {
    set?: $Enums.DiagnosticType;
};
export type EnumDiagnosticStatusFieldUpdateOperationsInput = {
    set?: $Enums.DiagnosticStatus;
};
export type DiagnosticReportCreateWithoutUserInput = {
    id?: string;
    type: $Enums.DiagnosticType;
    input: string;
    result?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    status?: $Enums.DiagnosticStatus;
    createdAt?: Date | string;
};
export type DiagnosticReportUncheckedCreateWithoutUserInput = {
    id?: string;
    type: $Enums.DiagnosticType;
    input: string;
    result?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    status?: $Enums.DiagnosticStatus;
    createdAt?: Date | string;
};
export type DiagnosticReportCreateOrConnectWithoutUserInput = {
    where: Prisma.DiagnosticReportWhereUniqueInput;
    create: Prisma.XOR<Prisma.DiagnosticReportCreateWithoutUserInput, Prisma.DiagnosticReportUncheckedCreateWithoutUserInput>;
};
export type DiagnosticReportCreateManyUserInputEnvelope = {
    data: Prisma.DiagnosticReportCreateManyUserInput | Prisma.DiagnosticReportCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type DiagnosticReportUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.DiagnosticReportWhereUniqueInput;
    update: Prisma.XOR<Prisma.DiagnosticReportUpdateWithoutUserInput, Prisma.DiagnosticReportUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.DiagnosticReportCreateWithoutUserInput, Prisma.DiagnosticReportUncheckedCreateWithoutUserInput>;
};
export type DiagnosticReportUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.DiagnosticReportWhereUniqueInput;
    data: Prisma.XOR<Prisma.DiagnosticReportUpdateWithoutUserInput, Prisma.DiagnosticReportUncheckedUpdateWithoutUserInput>;
};
export type DiagnosticReportUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.DiagnosticReportScalarWhereInput;
    data: Prisma.XOR<Prisma.DiagnosticReportUpdateManyMutationInput, Prisma.DiagnosticReportUncheckedUpdateManyWithoutUserInput>;
};
export type DiagnosticReportScalarWhereInput = {
    AND?: Prisma.DiagnosticReportScalarWhereInput | Prisma.DiagnosticReportScalarWhereInput[];
    OR?: Prisma.DiagnosticReportScalarWhereInput[];
    NOT?: Prisma.DiagnosticReportScalarWhereInput | Prisma.DiagnosticReportScalarWhereInput[];
    id?: Prisma.StringFilter<"DiagnosticReport"> | string;
    userId?: Prisma.StringFilter<"DiagnosticReport"> | string;
    type?: Prisma.EnumDiagnosticTypeFilter<"DiagnosticReport"> | $Enums.DiagnosticType;
    input?: Prisma.StringFilter<"DiagnosticReport"> | string;
    result?: Prisma.JsonNullableFilter<"DiagnosticReport">;
    status?: Prisma.EnumDiagnosticStatusFilter<"DiagnosticReport"> | $Enums.DiagnosticStatus;
    createdAt?: Prisma.DateTimeFilter<"DiagnosticReport"> | Date | string;
};
export type DiagnosticReportCreateManyUserInput = {
    id?: string;
    type: $Enums.DiagnosticType;
    input: string;
    result?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    status?: $Enums.DiagnosticStatus;
    createdAt?: Date | string;
};
export type DiagnosticReportUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumDiagnosticTypeFieldUpdateOperationsInput | $Enums.DiagnosticType;
    input?: Prisma.StringFieldUpdateOperationsInput | string;
    result?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    status?: Prisma.EnumDiagnosticStatusFieldUpdateOperationsInput | $Enums.DiagnosticStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DiagnosticReportUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumDiagnosticTypeFieldUpdateOperationsInput | $Enums.DiagnosticType;
    input?: Prisma.StringFieldUpdateOperationsInput | string;
    result?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    status?: Prisma.EnumDiagnosticStatusFieldUpdateOperationsInput | $Enums.DiagnosticStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DiagnosticReportUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumDiagnosticTypeFieldUpdateOperationsInput | $Enums.DiagnosticType;
    input?: Prisma.StringFieldUpdateOperationsInput | string;
    result?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    status?: Prisma.EnumDiagnosticStatusFieldUpdateOperationsInput | $Enums.DiagnosticStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DiagnosticReportSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    type?: boolean;
    input?: boolean;
    result?: boolean;
    status?: boolean;
    createdAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["diagnosticReport"]>;
export type DiagnosticReportSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    type?: boolean;
    input?: boolean;
    result?: boolean;
    status?: boolean;
    createdAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["diagnosticReport"]>;
export type DiagnosticReportSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    type?: boolean;
    input?: boolean;
    result?: boolean;
    status?: boolean;
    createdAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["diagnosticReport"]>;
export type DiagnosticReportSelectScalar = {
    id?: boolean;
    userId?: boolean;
    type?: boolean;
    input?: boolean;
    result?: boolean;
    status?: boolean;
    createdAt?: boolean;
};
export type DiagnosticReportOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "userId" | "type" | "input" | "result" | "status" | "createdAt", ExtArgs["result"]["diagnosticReport"]>;
export type DiagnosticReportInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type DiagnosticReportIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type DiagnosticReportIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $DiagnosticReportPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "DiagnosticReport";
    objects: {
        user: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        userId: string;
        type: $Enums.DiagnosticType;
        input: string;
        result: runtime.JsonValue | null;
        status: $Enums.DiagnosticStatus;
        createdAt: Date;
    }, ExtArgs["result"]["diagnosticReport"]>;
    composites: {};
};
export type DiagnosticReportGetPayload<S extends boolean | null | undefined | DiagnosticReportDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$DiagnosticReportPayload, S>;
export type DiagnosticReportCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<DiagnosticReportFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: DiagnosticReportCountAggregateInputType | true;
};
export interface DiagnosticReportDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['DiagnosticReport'];
        meta: {
            name: 'DiagnosticReport';
        };
    };
    findUnique<T extends DiagnosticReportFindUniqueArgs>(args: Prisma.SelectSubset<T, DiagnosticReportFindUniqueArgs<ExtArgs>>): Prisma.Prisma__DiagnosticReportClient<runtime.Types.Result.GetResult<Prisma.$DiagnosticReportPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends DiagnosticReportFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, DiagnosticReportFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__DiagnosticReportClient<runtime.Types.Result.GetResult<Prisma.$DiagnosticReportPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends DiagnosticReportFindFirstArgs>(args?: Prisma.SelectSubset<T, DiagnosticReportFindFirstArgs<ExtArgs>>): Prisma.Prisma__DiagnosticReportClient<runtime.Types.Result.GetResult<Prisma.$DiagnosticReportPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends DiagnosticReportFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, DiagnosticReportFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__DiagnosticReportClient<runtime.Types.Result.GetResult<Prisma.$DiagnosticReportPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends DiagnosticReportFindManyArgs>(args?: Prisma.SelectSubset<T, DiagnosticReportFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$DiagnosticReportPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends DiagnosticReportCreateArgs>(args: Prisma.SelectSubset<T, DiagnosticReportCreateArgs<ExtArgs>>): Prisma.Prisma__DiagnosticReportClient<runtime.Types.Result.GetResult<Prisma.$DiagnosticReportPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends DiagnosticReportCreateManyArgs>(args?: Prisma.SelectSubset<T, DiagnosticReportCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends DiagnosticReportCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, DiagnosticReportCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$DiagnosticReportPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends DiagnosticReportDeleteArgs>(args: Prisma.SelectSubset<T, DiagnosticReportDeleteArgs<ExtArgs>>): Prisma.Prisma__DiagnosticReportClient<runtime.Types.Result.GetResult<Prisma.$DiagnosticReportPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends DiagnosticReportUpdateArgs>(args: Prisma.SelectSubset<T, DiagnosticReportUpdateArgs<ExtArgs>>): Prisma.Prisma__DiagnosticReportClient<runtime.Types.Result.GetResult<Prisma.$DiagnosticReportPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends DiagnosticReportDeleteManyArgs>(args?: Prisma.SelectSubset<T, DiagnosticReportDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends DiagnosticReportUpdateManyArgs>(args: Prisma.SelectSubset<T, DiagnosticReportUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends DiagnosticReportUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, DiagnosticReportUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$DiagnosticReportPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends DiagnosticReportUpsertArgs>(args: Prisma.SelectSubset<T, DiagnosticReportUpsertArgs<ExtArgs>>): Prisma.Prisma__DiagnosticReportClient<runtime.Types.Result.GetResult<Prisma.$DiagnosticReportPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends DiagnosticReportCountArgs>(args?: Prisma.Subset<T, DiagnosticReportCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], DiagnosticReportCountAggregateOutputType> : number>;
    aggregate<T extends DiagnosticReportAggregateArgs>(args: Prisma.Subset<T, DiagnosticReportAggregateArgs>): Prisma.PrismaPromise<GetDiagnosticReportAggregateType<T>>;
    groupBy<T extends DiagnosticReportGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: DiagnosticReportGroupByArgs['orderBy'];
    } : {
        orderBy?: DiagnosticReportGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, DiagnosticReportGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDiagnosticReportGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: DiagnosticReportFieldRefs;
}
export interface Prisma__DiagnosticReportClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface DiagnosticReportFieldRefs {
    readonly id: Prisma.FieldRef<"DiagnosticReport", 'String'>;
    readonly userId: Prisma.FieldRef<"DiagnosticReport", 'String'>;
    readonly type: Prisma.FieldRef<"DiagnosticReport", 'DiagnosticType'>;
    readonly input: Prisma.FieldRef<"DiagnosticReport", 'String'>;
    readonly result: Prisma.FieldRef<"DiagnosticReport", 'Json'>;
    readonly status: Prisma.FieldRef<"DiagnosticReport", 'DiagnosticStatus'>;
    readonly createdAt: Prisma.FieldRef<"DiagnosticReport", 'DateTime'>;
}
export type DiagnosticReportFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DiagnosticReportSelect<ExtArgs> | null;
    omit?: Prisma.DiagnosticReportOmit<ExtArgs> | null;
    include?: Prisma.DiagnosticReportInclude<ExtArgs> | null;
    where: Prisma.DiagnosticReportWhereUniqueInput;
};
export type DiagnosticReportFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DiagnosticReportSelect<ExtArgs> | null;
    omit?: Prisma.DiagnosticReportOmit<ExtArgs> | null;
    include?: Prisma.DiagnosticReportInclude<ExtArgs> | null;
    where: Prisma.DiagnosticReportWhereUniqueInput;
};
export type DiagnosticReportFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DiagnosticReportSelect<ExtArgs> | null;
    omit?: Prisma.DiagnosticReportOmit<ExtArgs> | null;
    include?: Prisma.DiagnosticReportInclude<ExtArgs> | null;
    where?: Prisma.DiagnosticReportWhereInput;
    orderBy?: Prisma.DiagnosticReportOrderByWithRelationInput | Prisma.DiagnosticReportOrderByWithRelationInput[];
    cursor?: Prisma.DiagnosticReportWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.DiagnosticReportScalarFieldEnum | Prisma.DiagnosticReportScalarFieldEnum[];
};
export type DiagnosticReportFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DiagnosticReportSelect<ExtArgs> | null;
    omit?: Prisma.DiagnosticReportOmit<ExtArgs> | null;
    include?: Prisma.DiagnosticReportInclude<ExtArgs> | null;
    where?: Prisma.DiagnosticReportWhereInput;
    orderBy?: Prisma.DiagnosticReportOrderByWithRelationInput | Prisma.DiagnosticReportOrderByWithRelationInput[];
    cursor?: Prisma.DiagnosticReportWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.DiagnosticReportScalarFieldEnum | Prisma.DiagnosticReportScalarFieldEnum[];
};
export type DiagnosticReportFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DiagnosticReportSelect<ExtArgs> | null;
    omit?: Prisma.DiagnosticReportOmit<ExtArgs> | null;
    include?: Prisma.DiagnosticReportInclude<ExtArgs> | null;
    where?: Prisma.DiagnosticReportWhereInput;
    orderBy?: Prisma.DiagnosticReportOrderByWithRelationInput | Prisma.DiagnosticReportOrderByWithRelationInput[];
    cursor?: Prisma.DiagnosticReportWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.DiagnosticReportScalarFieldEnum | Prisma.DiagnosticReportScalarFieldEnum[];
};
export type DiagnosticReportCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DiagnosticReportSelect<ExtArgs> | null;
    omit?: Prisma.DiagnosticReportOmit<ExtArgs> | null;
    include?: Prisma.DiagnosticReportInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.DiagnosticReportCreateInput, Prisma.DiagnosticReportUncheckedCreateInput>;
};
export type DiagnosticReportCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.DiagnosticReportCreateManyInput | Prisma.DiagnosticReportCreateManyInput[];
    skipDuplicates?: boolean;
};
export type DiagnosticReportCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DiagnosticReportSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.DiagnosticReportOmit<ExtArgs> | null;
    data: Prisma.DiagnosticReportCreateManyInput | Prisma.DiagnosticReportCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.DiagnosticReportIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type DiagnosticReportUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DiagnosticReportSelect<ExtArgs> | null;
    omit?: Prisma.DiagnosticReportOmit<ExtArgs> | null;
    include?: Prisma.DiagnosticReportInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.DiagnosticReportUpdateInput, Prisma.DiagnosticReportUncheckedUpdateInput>;
    where: Prisma.DiagnosticReportWhereUniqueInput;
};
export type DiagnosticReportUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.DiagnosticReportUpdateManyMutationInput, Prisma.DiagnosticReportUncheckedUpdateManyInput>;
    where?: Prisma.DiagnosticReportWhereInput;
    limit?: number;
};
export type DiagnosticReportUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DiagnosticReportSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.DiagnosticReportOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.DiagnosticReportUpdateManyMutationInput, Prisma.DiagnosticReportUncheckedUpdateManyInput>;
    where?: Prisma.DiagnosticReportWhereInput;
    limit?: number;
    include?: Prisma.DiagnosticReportIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type DiagnosticReportUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DiagnosticReportSelect<ExtArgs> | null;
    omit?: Prisma.DiagnosticReportOmit<ExtArgs> | null;
    include?: Prisma.DiagnosticReportInclude<ExtArgs> | null;
    where: Prisma.DiagnosticReportWhereUniqueInput;
    create: Prisma.XOR<Prisma.DiagnosticReportCreateInput, Prisma.DiagnosticReportUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.DiagnosticReportUpdateInput, Prisma.DiagnosticReportUncheckedUpdateInput>;
};
export type DiagnosticReportDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DiagnosticReportSelect<ExtArgs> | null;
    omit?: Prisma.DiagnosticReportOmit<ExtArgs> | null;
    include?: Prisma.DiagnosticReportInclude<ExtArgs> | null;
    where: Prisma.DiagnosticReportWhereUniqueInput;
};
export type DiagnosticReportDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.DiagnosticReportWhereInput;
    limit?: number;
};
export type DiagnosticReportDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DiagnosticReportSelect<ExtArgs> | null;
    omit?: Prisma.DiagnosticReportOmit<ExtArgs> | null;
    include?: Prisma.DiagnosticReportInclude<ExtArgs> | null;
};
