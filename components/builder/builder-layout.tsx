"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { StepWizard } from "./step-wizard";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";

interface Step {
  id: string;
  label: string;
  description?: string;
}

interface BuilderLayoutProps {
  title: string;
  description?: string;
  icon: React.ElementType;
  steps: Step[];
  currentStep: number;
  completedSteps: Set<number>;
  onStepClick: (i: number) => void;
  onBack: () => void;
  onNext: () => void;
  onFinish?: () => void;
  isLastStep: boolean;
  children: ReactNode;
}

export function BuilderLayout({
  title,
  description,
  icon: Icon,
  steps,
  currentStep,
  completedSteps,
  onStepClick,
  onBack,
  onNext,
  onFinish,
  isLastStep,
  children,
}: BuilderLayoutProps) {
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
          <Icon size={24} className="text-primary" />
        </div>
        <div>
          <h1 className="text-xl font-semibold tracking-tight">{title}</h1>
          {description && (
            <p className="text-sm text-muted-foreground mt-0.5">{description}</p>
          )}
        </div>
      </div>

      {/* Body: Wizard sidebar + Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Steps sidebar */}
        <div className="lg:col-span-1">
          <div className="lg:sticky lg:top-20 space-y-4">
            <StepWizard
              steps={steps}
              currentStep={currentStep}
              completedSteps={completedSteps}
              onStepClick={onStepClick}
            />
          </div>
        </div>

        {/* Main content */}
        <div className="lg:col-span-3 space-y-6">
          <Card className="p-6">
            <div className="min-h-[320px]">{children}</div>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
              <Button
                variant="outline"
                size="sm"
                onClick={onBack}
                disabled={currentStep === 0}
              >
                <ArrowLeft size={14} className="mr-1.5" /> 上一步
              </Button>

              <span className="text-xs text-muted-foreground">
                {currentStep + 1} / {steps.length}
              </span>

              {isLastStep ? (
                <Button size="sm" onClick={onFinish}>
                  <Check size={14} className="mr-1.5" /> 完成构建
                </Button>
              ) : (
                <Button size="sm" onClick={onNext}>
                  下一步 <ArrowRight size={14} className="ml-1.5" />
                </Button>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
