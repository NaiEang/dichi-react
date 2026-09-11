import { Card, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

function ProjectCard({ title, status, statusVariant = "default", link = "#" }) {
  return (
    <Card className="flex flex-col justify-between hover:shadow-md transition-shadow duration-200 border-gray-200">
      <CardHeader className="p-4">
        <div className="flex items-center justify-between gap-2">
          <CardTitle className="text-base font-semibold text-gray-900">
            {title}
          </CardTitle>
          <Badge variant={statusVariant}>{status}</Badge>
        </div>
      </CardHeader>
      <CardFooter className="p-4 pt-0">
        <Button asChild variant="outline" size="sm" className="w-full hover:bg-gray-50 transition-colors">
          <a href={link} target="_blank" rel="noopener noreferrer">
            View project
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
}