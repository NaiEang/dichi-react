import { Card, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

function StatusBadge({ isOpenToWork }) {
  return (
    <span
      className={`inline-block px-3 py-1 rounded-full text-sm font-semibold transition-colors duration-200 ${
        isOpenToWork
          ? "bg-emerald-100 text-emerald-800"
          : "bg-gray-100 text-gray-600"
      }`}
    >
      {isOpenToWork ? "Open to work" : "Busy learning"}
    </span>
  );
}

function Section({ title, children }) {
  return (
    <section className="mb-8">
      {title && (
        <h2 className="text-xl font-bold text-gray-900 mb-3 tracking-tight">
          {title}
        </h2>
      )}
      {children}
    </section>
  );
}

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

export default function App() {
  const currentYear = new Date().getFullYear();
  const isAvailable = true;

  return (
    <main className="max-w-5xl mx-auto p-4 md:p-8 font-sans">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Srun Nai Eang</h1>
        <p className="text-gray-500">Software Engineering student</p>
      </header>

      {/* Main Grid: 1 column on mobile, 3 columns on desktop */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {/* Main Content (2 columns on md:) */}
        <div className="md:col-span-2">
          <Section title="About">
            <p className="text-gray-700 leading-relaxed">
              Goal for this course: Master modern React architecture and build clean, scalable web interfaces.
            </p>
          </Section>

          <Section title="Projects">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <ProjectCard
                title="Bus Simulation Dashboard"
                status="In progress"
                statusVariant="secondary"
                link="#"
              />
              <ProjectCard
                title="Portfolio Site"
                status="Complete"
                statusVariant="default"
                link="#"
              />
            </div>
          </Section>
        </div>

        {/* Sidebar (1 column on md:) */}
        <aside className="md:col-span-1">
          <Section title="Status">
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
              <StatusBadge isOpenToWork={isAvailable} />
              <p className="text-gray-500 text-sm mt-4">
                Profile updated in {currentYear}
              </p>
            </div>
          </Section>
        </aside>
      </div>
    </main>
  );
}