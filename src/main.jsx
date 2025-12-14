import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { CardConstructor } from "./context/CardContext";
import { ChakraProvider } from "@chakra-ui/react";
import { ProfileProvider } from "./context/Profile";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n.js";
import { QuestionProvider } from "./context/Question.jsx";
import CardsContext from "./context/CardsDataContext.jsx";
import { SupportProvider } from "./context/SupoortContext.jsx";
import { TimeConstructor } from "./context/TimerContext";
import { DivineDataProvider } from "./context/DivineDataContext";
import { SynastryDataProvider } from "./context/DivineSynastry.jsx";
import { DivineProvider } from "./context/DivineHome.jsx";
import { TranslationProvider } from "./context/TranslationContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <CardConstructor>
      <TimeConstructor>
        <ChakraProvider>
          <CardsContext>
            <SupportProvider>
              <ProfileProvider>
                <QuestionProvider>
                  <DivineDataProvider>
                    <SynastryDataProvider>
                      <DivineProvider>
                        <TranslationProvider>
                          <I18nextProvider i18n={i18n}>
                            <App />
                          </I18nextProvider>
                        </TranslationProvider>
                      </DivineProvider>
                    </SynastryDataProvider>
                  </DivineDataProvider>
                </QuestionProvider>
              </ProfileProvider>
            </SupportProvider>
          </CardsContext>
        </ChakraProvider>
      </TimeConstructor>
    </CardConstructor>
  </Router>
);