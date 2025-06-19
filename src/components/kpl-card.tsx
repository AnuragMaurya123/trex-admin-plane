import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export default function KPICard({
  title,
  value,
  subtitle,
  icon,
}: {
  title: string;
  value: string | number;
  subtitle: string;
  icon: React.ReactNode;
}) {
  return (
    <Card className="bg-gradient-to-r from-purple-500 to-purple-600 shadow-xl hover:scale-[1.02] hover:shadow-2xl border-0 transition-transform duration-200">
      <CardHeader className="flex items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-white">
          {title}
        </CardTitle>
        {icon}
      </CardHeader>
      <CardContent className="text-slate-200">
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{subtitle}</p>
      </CardContent>
    </Card>
  );
}