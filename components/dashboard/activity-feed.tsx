import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";

interface ActivityItem {
  id: string;
  action: string;
  project: string;
  time: string;
  icon: React.ElementType;
}

export function ActivityFeed({ activities }: { activities: ActivityItem[] }) {
  return (
    <Card className="p-0 overflow-hidden">
      <div className="px-5 py-4 border-b border-border">
        <h2 className="text-sm font-semibold">最近活动</h2>
      </div>
      {activities.length === 0 ? (
        <div className="py-12 text-center text-sm text-muted-foreground">
          暂无活动
        </div>
      ) : (
        <div className="divide-y divide-border">
          {activities.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className={cn(
                  "flex items-start gap-3 px-5 py-3.5",
                  i === 0 &&
                    "bg-primary/[0.02] dark:bg-primary/[0.03]"
                )}
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-muted">
                  <Icon size={13} className="text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm">
                    <span className="font-medium">{item.action}</span>{" "}
                    <span className="text-muted-foreground">{item.project}</span>
                  </p>
                </div>
                <span className="text-xs text-muted-foreground whitespace-nowrap">
                  {item.time}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </Card>
  );
}
