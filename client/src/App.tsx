import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Council from "./pages/Council";
import Sages from "./pages/Sages";
import SageDetail from "./pages/SageDetail";
import Journeys from "./pages/Journeys";
import JourneyDetail from "./pages/JourneyDetail";
import MyPath from "./pages/MyPath";
import AdminConsole from "./pages/AdminConsole";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/council" component={Council} />
      <Route path="/sages" component={Sages} />
      <Route path="/sages/:teacherId" component={SageDetail} />
      <Route path="/journeys" component={Journeys} />
      <Route path="/journeys/:journeyId" component={JourneyDetail} />
      <Route path="/my-path" component={MyPath} />
      <Route path="/admin" component={AdminConsole} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
