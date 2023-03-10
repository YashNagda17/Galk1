import React from "react";
import { FreelanceJobContainer } from "../freelance/job/freelanceJobContainer";
import { CandidateListContainer } from "../freelance/candidate/candidateListContainer";
import { DashboardContainer } from "../freelance/dashboard/dashboardContainer";
import { ManagementContainer } from "../freelance/management/managementContainer";
import { ChatBoxContainer } from "../freelance/chatbox/ChatBoxContainer";
import { ActivityLogContainer } from "../freelance/activitylog/ActivityLogContainer";
import { Redirect, Switch } from "react-router-dom";
import RestrictedRoute from "../common/RestrictedRoute";

import { Main as Layout } from "../../layouts";

export default function FreelanceRoot(props) {
  return (
    <Layout>
      <Switch>
        <Redirect
          exact
          from={`${props.match.path}`}
          to={`${props.match.path}/dashboard`}
        />
        <RestrictedRoute
          exact
          path={`${props.match.path}/dashboard`}
          component={DashboardContainer}
        />
        <RestrictedRoute
          path={`${props.match.path}/jobs`}
          component={FreelanceJobContainer}
        />
        <RestrictedRoute
          path={`${props.match.path}/candidates`}
          component={CandidateListContainer}
        />
        <RestrictedRoute
          path={`${props.match.path}/management`}
          component={ManagementContainer}
        />
        <RestrictedRoute
          path={`${props.match.path}/chatbox`}
          component={ChatBoxContainer}
        />
        <RestrictedRoute
          path={`${props.match.path}/activitylog`}
          component={ActivityLogContainer}
        />
      </Switch>
    </Layout>
  );
}
