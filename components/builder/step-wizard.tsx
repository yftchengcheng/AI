"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Check, ChevronRight } from "lucide-react";

interface Step {
  id: string;
  label: string;
  description?: string;
}

interface StepWizardProps {
  steps: Step[];
  currentStep: number;
  onStepClick?: (index: number) => void;
  completedSteps: Set<number>;
}

export function StepWizard({ steps, currentStep, onStepClick, completedSteps }: StepWizardProps) {
  return (
    <Card className="p-0 overflow-hidden">
      <div className="px-4 py-3 bg-muted/30 border-b border-border">
        <div className="flex items-center gap-2 text-sm">
          <span className="text-muted-foreground">步骤</span>
          <span className="font-semibold">{currentStep + 1}</span>
          <span className="text-muted-foreground">/ {steps.length}</span>
        </div>
      </div>
      <div className="divide-y divide-border">
        {steps.map((step, i) => {
          const isActive = i === currentStep;
          const isCompleted = completedSteps.has(i);
          const isPast = i < currentStep;

          return (
            <button
              key={step.id}
              onClick={() => onStepClick?.(i)}
              disabled={!isPast && !isCompleted && !isActive}
              className={cn(
                "flex items-center gap-3 w-full px-4 py-3 text-left transition-colors",
                isActive && "bg-primary/[0.04] dark:bg-primary/[0.06]",
                (isPast || isCompleted) && "opacity-70",
                !isPast && !isActive && !isCompleted && "cursor-default"
              )}
            >
              {/* Step indicator */}
              <div
                className={cn(
                  "flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-medium",
                  isCompleted
                    ? "bg-primary text-primary-foreground"
                    : isActive
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                )}
              >
                {isCompleted ? <Check size={12} /> : i + 1}
              </div>
              <div className="flex-1 min-w-0">
                <p
                  className={cn(
                    "text-sm font-medium",
                    isActive ? "text-foreground" : "text-muted-foreground"
                  )}
                >
                  {step.label}
                </p>
                {step.description && (
                  <p className="text-xs text-muted-foreground truncate">
                    {step.description}
                  </p>
                )}
              </div>
              {isActive && <ChevronRight size={14} className="text-muted-foreground shrink-0" />}
            </button>
          );
        })}
      </div>
    </Card>
  );
}
