import { usePathname, useRouter } from "next/navigation";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Crown } from "lucide-react";

export function ModeSwitch() {
  const router = useRouter();
  const pathname = usePathname();
  const isBatchMode = pathname === "/batch";

  function handleModeChange(checked: boolean) {
    if (checked) {
      router.push("/batch");
    } else {
      router.push("/");
    }
  }

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-1">
        <Label
          htmlFor="mode-switch"
          className="hidden text-sm text-gray-600 sm:block"
        >
          单图
        </Label>
      </div>
      <Switch
        id="mode-switch"
        checked={isBatchMode}
        onCheckedChange={handleModeChange}
        className="data-[state=checked]:bg-amber-500"
      />
      <div className="flex items-center gap-1">
        <Label
          htmlFor="mode-switch"
          className="hidden text-sm text-gray-600 sm:block"
        >
          批量
        </Label>
        <Crown className="h-4 w-4 fill-amber-200 text-amber-500" />
      </div>
    </div>
  );
}
