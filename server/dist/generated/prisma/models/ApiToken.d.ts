import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type ApiTokenModel = runtime.Types.Result.DefaultSelection<Prisma.$ApiTokenPayload>;
export type AggregateApiToken = {
    _count: ApiTokenCountAggregateOutputType | null;
    _min: ApiTokenMinAggregateOutputType | null;
    _max: ApiTokenMaxAggregateOutputType | null;
};
export type ApiTokenMinAggregateOutputType = {
    id: string | null;
    name: string | null;
    key: string | null;
    userId: string | null;
};
export type ApiTokenMaxAggregateOutputType = {
    id: string | null;
    name: string | null;
    key: string | null;
    userId: string | null;
};
export type ApiTokenCountAggregateOutputType = {
    id: number;
    name: number;
    key: number;
    userId: number;
    _all: number;
};
export type ApiTokenMinAggregateInputType = {
    id?: true;
    name?: true;
    key?: true;
    userId?: true;
};
export type ApiTokenMaxAggregateInputType = {
    id?: true;
    name?: true;
    key?: true;
    userId?: true;
};
export type ApiTokenCountAggregateInputType = {
    id?: true;
    name?: true;
    key?: true;
    userId?: true;
    _all?: true;
};
export type ApiTokenAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ApiTokenWhereInput;
    orderBy?: Prisma.ApiTokenOrderByWithRelationInput | Prisma.ApiTokenOrderByWithRelationInput[];
    cursor?: Prisma.ApiTokenWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | ApiTokenCountAggregateInputType;
    _min?: ApiTokenMinAggregateInputType;
    _max?: ApiTokenMaxAggregateInputType;
};
export type GetApiTokenAggregateType<T extends ApiTokenAggregateArgs> = {
    [P in keyof T & keyof AggregateApiToken]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateApiToken[P]> : Prisma.GetScalarType<T[P], AggregateApiToken[P]>;
};
export type ApiTokenGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ApiTokenWhereInput;
    orderBy?: Prisma.ApiTokenOrderByWithAggregationInput | Prisma.ApiTokenOrderByWithAggregationInput[];
    by: Prisma.ApiTokenScalarFieldEnum[] | Prisma.ApiTokenScalarFieldEnum;
    having?: Prisma.ApiTokenScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ApiTokenCountAggregateInputType | true;
    _min?: ApiTokenMinAggregateInputType;
    _max?: ApiTokenMaxAggregateInputType;
};
export type ApiTokenGroupByOutputType = {
    id: string;
    name: string;
    key: string;
    userId: string;
    _count: ApiTokenCountAggregateOutputType | null;
    _min: ApiTokenMinAggregateOutputType | null;
    _max: ApiTokenMaxAggregateOutputType | null;
};
export type GetApiTokenGroupByPayload<T extends ApiTokenGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ApiTokenGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ApiTokenGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ApiTokenGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ApiTokenGroupByOutputType[P]>;
}>>;
export type ApiTokenWhereInput = {
    AND?: Prisma.ApiTokenWhereInput | Prisma.ApiTokenWhereInput[];
    OR?: Prisma.ApiTokenWhereInput[];
    NOT?: Prisma.ApiTokenWhereInput | Prisma.ApiTokenWhereInput[];
    id?: Prisma.StringFilter<"ApiToken"> | string;
    name?: Prisma.StringFilter<"ApiToken"> | string;
    key?: Prisma.StringFilter<"ApiToken"> | string;
    userId?: Prisma.StringFilter<"ApiToken"> | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
};
export type ApiTokenOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    key?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    user?: Prisma.UserOrderByWithRelationInput;
};
export type ApiTokenWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    key?: string;
    AND?: Prisma.ApiTokenWhereInput | Prisma.ApiTokenWhereInput[];
    OR?: Prisma.ApiTokenWhereInput[];
    NOT?: Prisma.ApiTokenWhereInput | Prisma.ApiTokenWhereInput[];
    name?: Prisma.StringFilter<"ApiToken"> | string;
    userId?: Prisma.StringFilter<"ApiToken"> | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
}, "id" | "key">;
export type ApiTokenOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    key?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    _count?: Prisma.ApiTokenCountOrderByAggregateInput;
    _max?: Prisma.ApiTokenMaxOrderByAggregateInput;
    _min?: Prisma.ApiTokenMinOrderByAggregateInput;
};
export type ApiTokenScalarWhereWithAggregatesInput = {
    AND?: Prisma.ApiTokenScalarWhereWithAggregatesInput | Prisma.ApiTokenScalarWhereWithAggregatesInput[];
    OR?: Prisma.ApiTokenScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ApiTokenScalarWhereWithAggregatesInput | Prisma.ApiTokenScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"ApiToken"> | string;
    name?: Prisma.StringWithAggregatesFilter<"ApiToken"> | string;
    key?: Prisma.StringWithAggregatesFilter<"ApiToken"> | string;
    userId?: Prisma.StringWithAggregatesFilter<"ApiToken"> | string;
};
export type ApiTokenCreateInput = {
    id?: string;
    name: string;
    key: string;
    user: Prisma.UserCreateNestedOneWithoutTokensInput;
};
export type ApiTokenUncheckedCreateInput = {
    id?: string;
    name: string;
    key: string;
    userId: string;
};
export type ApiTokenUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    key?: Prisma.StringFieldUpdateOperationsInput | string;
    user?: Prisma.UserUpdateOneRequiredWithoutTokensNestedInput;
};
export type ApiTokenUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    key?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type ApiTokenCreateManyInput = {
    id?: string;
    name: string;
    key: string;
    userId: string;
};
export type ApiTokenUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    key?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type ApiTokenUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    key?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type ApiTokenListRelationFilter = {
    every?: Prisma.ApiTokenWhereInput;
    some?: Prisma.ApiTokenWhereInput;
    none?: Prisma.ApiTokenWhereInput;
};
export type ApiTokenOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type ApiTokenCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    key?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
};
export type ApiTokenMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    key?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
};
export type ApiTokenMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    key?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
};
export type ApiTokenCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.ApiTokenCreateWithoutUserInput, Prisma.ApiTokenUncheckedCreateWithoutUserInput> | Prisma.ApiTokenCreateWithoutUserInput[] | Prisma.ApiTokenUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.ApiTokenCreateOrConnectWithoutUserInput | Prisma.ApiTokenCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.ApiTokenCreateManyUserInputEnvelope;
    connect?: Prisma.ApiTokenWhereUniqueInput | Prisma.ApiTokenWhereUniqueInput[];
};
export type ApiTokenUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.ApiTokenCreateWithoutUserInput, Prisma.ApiTokenUncheckedCreateWithoutUserInput> | Prisma.ApiTokenCreateWithoutUserInput[] | Prisma.ApiTokenUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.ApiTokenCreateOrConnectWithoutUserInput | Prisma.ApiTokenCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.ApiTokenCreateManyUserInputEnvelope;
    connect?: Prisma.ApiTokenWhereUniqueInput | Prisma.ApiTokenWhereUniqueInput[];
};
export type ApiTokenUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.ApiTokenCreateWithoutUserInput, Prisma.ApiTokenUncheckedCreateWithoutUserInput> | Prisma.ApiTokenCreateWithoutUserInput[] | Prisma.ApiTokenUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.ApiTokenCreateOrConnectWithoutUserInput | Prisma.ApiTokenCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.ApiTokenUpsertWithWhereUniqueWithoutUserInput | Prisma.ApiTokenUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.ApiTokenCreateManyUserInputEnvelope;
    set?: Prisma.ApiTokenWhereUniqueInput | Prisma.ApiTokenWhereUniqueInput[];
    disconnect?: Prisma.ApiTokenWhereUniqueInput | Prisma.ApiTokenWhereUniqueInput[];
    delete?: Prisma.ApiTokenWhereUniqueInput | Prisma.ApiTokenWhereUniqueInput[];
    connect?: Prisma.ApiTokenWhereUniqueInput | Prisma.ApiTokenWhereUniqueInput[];
    update?: Prisma.ApiTokenUpdateWithWhereUniqueWithoutUserInput | Prisma.ApiTokenUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.ApiTokenUpdateManyWithWhereWithoutUserInput | Prisma.ApiTokenUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.ApiTokenScalarWhereInput | Prisma.ApiTokenScalarWhereInput[];
};
export type ApiTokenUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.ApiTokenCreateWithoutUserInput, Prisma.ApiTokenUncheckedCreateWithoutUserInput> | Prisma.ApiTokenCreateWithoutUserInput[] | Prisma.ApiTokenUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.ApiTokenCreateOrConnectWithoutUserInput | Prisma.ApiTokenCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.ApiTokenUpsertWithWhereUniqueWithoutUserInput | Prisma.ApiTokenUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.ApiTokenCreateManyUserInputEnvelope;
    set?: Prisma.ApiTokenWhereUniqueInput | Prisma.ApiTokenWhereUniqueInput[];
    disconnect?: Prisma.ApiTokenWhereUniqueInput | Prisma.ApiTokenWhereUniqueInput[];
    delete?: Prisma.ApiTokenWhereUniqueInput | Prisma.ApiTokenWhereUniqueInput[];
    connect?: Prisma.ApiTokenWhereUniqueInput | Prisma.ApiTokenWhereUniqueInput[];
    update?: Prisma.ApiTokenUpdateWithWhereUniqueWithoutUserInput | Prisma.ApiTokenUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.ApiTokenUpdateManyWithWhereWithoutUserInput | Prisma.ApiTokenUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.ApiTokenScalarWhereInput | Prisma.ApiTokenScalarWhereInput[];
};
export type ApiTokenCreateWithoutUserInput = {
    id?: string;
    name: string;
    key: string;
};
export type ApiTokenUncheckedCreateWithoutUserInput = {
    id?: string;
    name: string;
    key: string;
};
export type ApiTokenCreateOrConnectWithoutUserInput = {
    where: Prisma.ApiTokenWhereUniqueInput;
    create: Prisma.XOR<Prisma.ApiTokenCreateWithoutUserInput, Prisma.ApiTokenUncheckedCreateWithoutUserInput>;
};
export type ApiTokenCreateManyUserInputEnvelope = {
    data: Prisma.ApiTokenCreateManyUserInput | Prisma.ApiTokenCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type ApiTokenUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.ApiTokenWhereUniqueInput;
    update: Prisma.XOR<Prisma.ApiTokenUpdateWithoutUserInput, Prisma.ApiTokenUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.ApiTokenCreateWithoutUserInput, Prisma.ApiTokenUncheckedCreateWithoutUserInput>;
};
export type ApiTokenUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.ApiTokenWhereUniqueInput;
    data: Prisma.XOR<Prisma.ApiTokenUpdateWithoutUserInput, Prisma.ApiTokenUncheckedUpdateWithoutUserInput>;
};
export type ApiTokenUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.ApiTokenScalarWhereInput;
    data: Prisma.XOR<Prisma.ApiTokenUpdateManyMutationInput, Prisma.ApiTokenUncheckedUpdateManyWithoutUserInput>;
};
export type ApiTokenScalarWhereInput = {
    AND?: Prisma.ApiTokenScalarWhereInput | Prisma.ApiTokenScalarWhereInput[];
    OR?: Prisma.ApiTokenScalarWhereInput[];
    NOT?: Prisma.ApiTokenScalarWhereInput | Prisma.ApiTokenScalarWhereInput[];
    id?: Prisma.StringFilter<"ApiToken"> | string;
    name?: Prisma.StringFilter<"ApiToken"> | string;
    key?: Prisma.StringFilter<"ApiToken"> | string;
    userId?: Prisma.StringFilter<"ApiToken"> | string;
};
export type ApiTokenCreateManyUserInput = {
    id?: string;
    name: string;
    key: string;
};
export type ApiTokenUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    key?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type ApiTokenUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    key?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type ApiTokenUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    key?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type ApiTokenSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    key?: boolean;
    userId?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["apiToken"]>;
export type ApiTokenSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    key?: boolean;
    userId?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["apiToken"]>;
export type ApiTokenSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    key?: boolean;
    userId?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["apiToken"]>;
export type ApiTokenSelectScalar = {
    id?: boolean;
    name?: boolean;
    key?: boolean;
    userId?: boolean;
};
export type ApiTokenOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "name" | "key" | "userId", ExtArgs["result"]["apiToken"]>;
export type ApiTokenInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type ApiTokenIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type ApiTokenIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $ApiTokenPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "ApiToken";
    objects: {
        user: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        name: string;
        key: string;
        userId: string;
    }, ExtArgs["result"]["apiToken"]>;
    composites: {};
};
export type ApiTokenGetPayload<S extends boolean | null | undefined | ApiTokenDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ApiTokenPayload, S>;
export type ApiTokenCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ApiTokenFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ApiTokenCountAggregateInputType | true;
};
export interface ApiTokenDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['ApiToken'];
        meta: {
            name: 'ApiToken';
        };
    };
    findUnique<T extends ApiTokenFindUniqueArgs>(args: Prisma.SelectSubset<T, ApiTokenFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ApiTokenClient<runtime.Types.Result.GetResult<Prisma.$ApiTokenPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends ApiTokenFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ApiTokenFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ApiTokenClient<runtime.Types.Result.GetResult<Prisma.$ApiTokenPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends ApiTokenFindFirstArgs>(args?: Prisma.SelectSubset<T, ApiTokenFindFirstArgs<ExtArgs>>): Prisma.Prisma__ApiTokenClient<runtime.Types.Result.GetResult<Prisma.$ApiTokenPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends ApiTokenFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ApiTokenFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ApiTokenClient<runtime.Types.Result.GetResult<Prisma.$ApiTokenPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends ApiTokenFindManyArgs>(args?: Prisma.SelectSubset<T, ApiTokenFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ApiTokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends ApiTokenCreateArgs>(args: Prisma.SelectSubset<T, ApiTokenCreateArgs<ExtArgs>>): Prisma.Prisma__ApiTokenClient<runtime.Types.Result.GetResult<Prisma.$ApiTokenPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends ApiTokenCreateManyArgs>(args?: Prisma.SelectSubset<T, ApiTokenCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends ApiTokenCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, ApiTokenCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ApiTokenPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends ApiTokenDeleteArgs>(args: Prisma.SelectSubset<T, ApiTokenDeleteArgs<ExtArgs>>): Prisma.Prisma__ApiTokenClient<runtime.Types.Result.GetResult<Prisma.$ApiTokenPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends ApiTokenUpdateArgs>(args: Prisma.SelectSubset<T, ApiTokenUpdateArgs<ExtArgs>>): Prisma.Prisma__ApiTokenClient<runtime.Types.Result.GetResult<Prisma.$ApiTokenPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends ApiTokenDeleteManyArgs>(args?: Prisma.SelectSubset<T, ApiTokenDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends ApiTokenUpdateManyArgs>(args: Prisma.SelectSubset<T, ApiTokenUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends ApiTokenUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, ApiTokenUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ApiTokenPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends ApiTokenUpsertArgs>(args: Prisma.SelectSubset<T, ApiTokenUpsertArgs<ExtArgs>>): Prisma.Prisma__ApiTokenClient<runtime.Types.Result.GetResult<Prisma.$ApiTokenPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends ApiTokenCountArgs>(args?: Prisma.Subset<T, ApiTokenCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ApiTokenCountAggregateOutputType> : number>;
    aggregate<T extends ApiTokenAggregateArgs>(args: Prisma.Subset<T, ApiTokenAggregateArgs>): Prisma.PrismaPromise<GetApiTokenAggregateType<T>>;
    groupBy<T extends ApiTokenGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ApiTokenGroupByArgs['orderBy'];
    } : {
        orderBy?: ApiTokenGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ApiTokenGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetApiTokenGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: ApiTokenFieldRefs;
}
export interface Prisma__ApiTokenClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface ApiTokenFieldRefs {
    readonly id: Prisma.FieldRef<"ApiToken", 'String'>;
    readonly name: Prisma.FieldRef<"ApiToken", 'String'>;
    readonly key: Prisma.FieldRef<"ApiToken", 'String'>;
    readonly userId: Prisma.FieldRef<"ApiToken", 'String'>;
}
export type ApiTokenFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ApiTokenSelect<ExtArgs> | null;
    omit?: Prisma.ApiTokenOmit<ExtArgs> | null;
    include?: Prisma.ApiTokenInclude<ExtArgs> | null;
    where: Prisma.ApiTokenWhereUniqueInput;
};
export type ApiTokenFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ApiTokenSelect<ExtArgs> | null;
    omit?: Prisma.ApiTokenOmit<ExtArgs> | null;
    include?: Prisma.ApiTokenInclude<ExtArgs> | null;
    where: Prisma.ApiTokenWhereUniqueInput;
};
export type ApiTokenFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ApiTokenSelect<ExtArgs> | null;
    omit?: Prisma.ApiTokenOmit<ExtArgs> | null;
    include?: Prisma.ApiTokenInclude<ExtArgs> | null;
    where?: Prisma.ApiTokenWhereInput;
    orderBy?: Prisma.ApiTokenOrderByWithRelationInput | Prisma.ApiTokenOrderByWithRelationInput[];
    cursor?: Prisma.ApiTokenWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ApiTokenScalarFieldEnum | Prisma.ApiTokenScalarFieldEnum[];
};
export type ApiTokenFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ApiTokenSelect<ExtArgs> | null;
    omit?: Prisma.ApiTokenOmit<ExtArgs> | null;
    include?: Prisma.ApiTokenInclude<ExtArgs> | null;
    where?: Prisma.ApiTokenWhereInput;
    orderBy?: Prisma.ApiTokenOrderByWithRelationInput | Prisma.ApiTokenOrderByWithRelationInput[];
    cursor?: Prisma.ApiTokenWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ApiTokenScalarFieldEnum | Prisma.ApiTokenScalarFieldEnum[];
};
export type ApiTokenFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ApiTokenSelect<ExtArgs> | null;
    omit?: Prisma.ApiTokenOmit<ExtArgs> | null;
    include?: Prisma.ApiTokenInclude<ExtArgs> | null;
    where?: Prisma.ApiTokenWhereInput;
    orderBy?: Prisma.ApiTokenOrderByWithRelationInput | Prisma.ApiTokenOrderByWithRelationInput[];
    cursor?: Prisma.ApiTokenWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ApiTokenScalarFieldEnum | Prisma.ApiTokenScalarFieldEnum[];
};
export type ApiTokenCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ApiTokenSelect<ExtArgs> | null;
    omit?: Prisma.ApiTokenOmit<ExtArgs> | null;
    include?: Prisma.ApiTokenInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ApiTokenCreateInput, Prisma.ApiTokenUncheckedCreateInput>;
};
export type ApiTokenCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.ApiTokenCreateManyInput | Prisma.ApiTokenCreateManyInput[];
    skipDuplicates?: boolean;
};
export type ApiTokenCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ApiTokenSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ApiTokenOmit<ExtArgs> | null;
    data: Prisma.ApiTokenCreateManyInput | Prisma.ApiTokenCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.ApiTokenIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type ApiTokenUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ApiTokenSelect<ExtArgs> | null;
    omit?: Prisma.ApiTokenOmit<ExtArgs> | null;
    include?: Prisma.ApiTokenInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ApiTokenUpdateInput, Prisma.ApiTokenUncheckedUpdateInput>;
    where: Prisma.ApiTokenWhereUniqueInput;
};
export type ApiTokenUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.ApiTokenUpdateManyMutationInput, Prisma.ApiTokenUncheckedUpdateManyInput>;
    where?: Prisma.ApiTokenWhereInput;
    limit?: number;
};
export type ApiTokenUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ApiTokenSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ApiTokenOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ApiTokenUpdateManyMutationInput, Prisma.ApiTokenUncheckedUpdateManyInput>;
    where?: Prisma.ApiTokenWhereInput;
    limit?: number;
    include?: Prisma.ApiTokenIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type ApiTokenUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ApiTokenSelect<ExtArgs> | null;
    omit?: Prisma.ApiTokenOmit<ExtArgs> | null;
    include?: Prisma.ApiTokenInclude<ExtArgs> | null;
    where: Prisma.ApiTokenWhereUniqueInput;
    create: Prisma.XOR<Prisma.ApiTokenCreateInput, Prisma.ApiTokenUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.ApiTokenUpdateInput, Prisma.ApiTokenUncheckedUpdateInput>;
};
export type ApiTokenDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ApiTokenSelect<ExtArgs> | null;
    omit?: Prisma.ApiTokenOmit<ExtArgs> | null;
    include?: Prisma.ApiTokenInclude<ExtArgs> | null;
    where: Prisma.ApiTokenWhereUniqueInput;
};
export type ApiTokenDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ApiTokenWhereInput;
    limit?: number;
};
export type ApiTokenDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ApiTokenSelect<ExtArgs> | null;
    omit?: Prisma.ApiTokenOmit<ExtArgs> | null;
    include?: Prisma.ApiTokenInclude<ExtArgs> | null;
};
