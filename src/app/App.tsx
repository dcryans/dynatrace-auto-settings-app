import { Page, ToastContainer } from "@dynatrace/strato-components-preview";
import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { useInitPageData } from "./hooks/usePageHooks";
import { NavigationSidebarTitleBar } from "./components/page/NavigationSidebarTitleBar";
import { SidebarContent } from "./components/page/SidebarContent";
import { PageDataContext } from "./contexts/PageDataContext";
import { FlexFullHeight } from "./common/Styles.css";
import { MainTitleBar } from "./components/page/MainTitleBar";
import { ApplyConfigs } from "./pages/ApplyConfigs";
import { ManualConfigs } from "./pages/ManualConfigs";
import { Tokens } from "./pages/Tokens";

export const App = () => {
  const pageState = useInitPageData();

  const getPageWithSideBarCallback = React.useCallback(
    (pageComponent: JSX.Element) => {
      return (
        <Page>
          <Page.Sidebar
            dismissed={pageState.isSidebarDismissed}
            onDismissChange={(state: boolean) =>
              pageState.setIsSidebarDismissed(state)
            }
          >
            <NavigationSidebarTitleBar />
            <SidebarContent />
          </Page.Sidebar>
          <Page.Main>
            <FlexFullHeight flexDirection="column">
              <MainTitleBar />
              {pageComponent}
            </FlexFullHeight>
            <ToastContainer />
          </Page.Main>
        </Page>
      );
    },
    [pageState]
  );

  return (
    <PageDataContext.Provider value={pageState}>
      <Page>
        <Routes>
          <Route path="/" element={getPageWithSideBarCallback(<Home />)} />
          <Route
            path="/ApplyConfigs"
            element={getPageWithSideBarCallback(<ApplyConfigs />)}
          />
          <Route
            path="/ManualConfigs"
            element={getPageWithSideBarCallback(<ManualConfigs />)}
          />
          <Route
            path="/tokens"
            element={getPageWithSideBarCallback(<Tokens />)}
          />
        </Routes>
      </Page>
    </PageDataContext.Provider>
  );
};
