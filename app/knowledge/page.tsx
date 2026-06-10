"use client";

import { useState } from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BookOpen, Upload, Search, FileText, Trash2,
  Loader2, Sparkles, ExternalLink,
} from "lucide-react";
import { api } from "@/lib/api";

interface SearchResult {
  content: string;
  documentName: string;
  similarity: number;
}

export default function KnowledgePage() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [sources, setSources] = useState<SearchResult[]>([]);
  const [searching, setSearching] = useState(false);

  const [docContent, setDocContent] = useState("");
  const [docName, setDocName] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!question.trim()) return;
    setSearching(true);
    setAnswer("");
    setSources([]);
    try {
      const result = await api.post<{ answer: string; sources: SearchResult[] }>(
        "/api/knowledge/query",
        { question }
      );
      setAnswer(result.answer);
      setSources(result.sources);
    } catch {
      setAnswer("查询失败，请确保后端服务已启动。");
    } finally {
      setSearching(false);
    }
  };

  const handleUpload = async () => {
    if (!docContent.trim() || !docName.trim()) return;
    setUploading(true);
    setUploadResult(null);
    try {
      const result = await api.post<{ documentId: string; chunkCount: number }>(
        "/api/knowledge/documents",
        { knowledgeBaseId: "default", name: docName, content: docContent, type: "txt" }
      );
      setUploadResult(`文档已处理：${result.chunkCount} 个片段`);
      setDocContent("");
      setDocName("");
    } catch {
      setUploadResult("上传失败，请确保后端服务已启动。");
    } finally {
      setUploading(false);
    }
  };

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-medium tracking-tight">知识库</h1>
          <p className="text-sm text-muted-foreground mt-1">
            上传文档构建知识库，基于 RAG 实现智能问答
          </p>
        </div>

        <Tabs defaultValue="query">
          <TabsList>
            <TabsTrigger value="query" className="gap-1.5">
              <Search size={14} /> 问答检索
            </TabsTrigger>
            <TabsTrigger value="upload" className="gap-1.5">
              <Upload size={14} /> 文档上传
            </TabsTrigger>
          </TabsList>

          {/* Query Tab */}
          <TabsContent value="query" className="mt-4 space-y-4">
            <Card className="p-5 space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="输入你的问题，基于知识库检索回答..."
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  className="flex-1"
                />
                <Button onClick={handleSearch} disabled={searching || !question.trim()}>
                  {searching ? <Loader2 size={14} className="mr-1.5 animate-spin" /> : <Sparkles size={14} className="mr-1.5" />}
                  检索
                </Button>
              </div>

              {searching && (
                <div className="space-y-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-16 w-full" />
                </div>
              )}

              {answer && (
                <div className="space-y-4">
                  <Separator />
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-muted-foreground">回答</p>
                    <div className="text-sm leading-relaxed whitespace-pre-wrap">{answer}</div>
                  </div>
                  {sources.length > 0 && (
                    <div className="space-y-1">
                      <p className="text-xs font-medium text-muted-foreground">参考来源</p>
                      {sources.map((s, i) => (
                        <div key={i} className="flex items-start gap-2 rounded-lg bg-muted/50 p-3 text-xs">
                          <ExternalLink size={12} className="mt-0.5 shrink-0 text-muted-foreground" />
                          <div>
                            <p className="font-medium">{s.documentName}</p>
                            <p className="text-muted-foreground mt-0.5 line-clamp-2">{s.content}</p>
                            <Badge variant="secondary" className="mt-1 text-[10px]">
                              相似度: {(s.similarity * 100).toFixed(1)}%
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </Card>
          </TabsContent>

          {/* Upload Tab */}
          <TabsContent value="upload" className="mt-4 space-y-4">
            <Card className="p-5 space-y-4">
              <div className="space-y-2">
                <p className="text-sm font-medium">文档名称</p>
                <Input
                  placeholder="例如：产品手册 v1.0"
                  value={docName}
                  onChange={(e) => setDocName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium">文档内容</p>
                <Textarea
                  placeholder="粘贴文档内容...（支持 TXT、Markdown）"
                  rows={10}
                  value={docContent}
                  onChange={(e) => setDocContent(e.target.value)}
                />
              </div>
              <Button onClick={handleUpload} disabled={uploading || !docContent.trim() || !docName.trim()}>
                {uploading ? <Loader2 size={14} className="mr-1.5 animate-spin" /> : <Upload size={14} className="mr-1.5" />}
                上传并处理
              </Button>
              {uploadResult && (
                <div className="rounded-lg bg-muted p-3 text-sm">{uploadResult}</div>
              )}
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
