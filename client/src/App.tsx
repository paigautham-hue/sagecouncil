import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import MicroRetreats from "./pages/MicroRetreats";
import ParadoxPlayground from "./pages/ParadoxPlayground";
import LifeExperiments from "./pages/LifeExperiments";
import AdminAnalytics from "@/pages/AdminAnalytics";
import Favorites from "./pages/Favorites";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import About from "./pages/About";
import FAQ from "./pages/FAQ";
import Safety from "./pages/Safety";
import Privacy from "./pages/Privacy";
import Council from "./pages/Council";
import Sages from "./pages/Sages";
import SageDetail from "./pages/SageDetail";
import Journeys from "./pages/Journeys";
import JourneyDetail from "./pages/JourneyDetail";
import MyPath from "./pages/MyPath";
import AdminConsole from "./pages/AdminConsole";
import AdminDashboard from "./pages/AdminDashboard";
import ComponentShowcase from "./pages/ComponentShowcase";

function Router() {
  return (
    <Switch>
      {/* Public Pages */}
      <Route path={"/"} component={Home} />
      <Route path="/about" component={About} />
      <Route path="/faq" component={FAQ} />
      <Route path="/safety" component={Safety} />
      <Route path="/privacy" component={Privacy} />

      {/* Core Features */}
      <Route path={"/council"} component={Council} />
      <Route path={"/favorites"} component={Favorites} />
      <Route path={"/micro-retreats"} component={MicroRetreats} />
      <Route path={"/paradox-playground"} component={ParadoxPlayground} />
      <Route path={"/life-experiments"} component={LifeExperiments} />

      {/* Sages - General route BEFORE specific route */}
      <Route path="/sages" component={Sages} />
      <Route path="/sages/:teacherId" component={SageDetail} />

      {/* Journeys - General route BEFORE specific route */}
      <Route path="/journeys" component={Journeys} />
      <Route path="/journeys/:journeyId" component={JourneyDetail} />

      {/* User Dashboard */}
      <Route path="/my-path" component={MyPath} />

      {/* Admin Routes */}
      <Route path={"/admin/analytics"} component={AdminAnalytics} />
      <Route path={"/admin/dashboard"} component={AdminDashboard} />
      <Route path={"/admin"} component={AdminConsole} />

      {/* Component Showcase (Dev/Testing) */}
      <Route path="/components" component={ComponentShowcase} />

      {/* Fallback - Must be last */}
      <Route path={"/404"} component={NotFound} />
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
