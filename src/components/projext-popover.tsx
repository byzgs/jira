import React from "react";
import { Divider, List, Popover, Typography, Button } from "antd";
import { useProjects } from "utils/project";
import styled from "@emotion/styled";
import { ButtonNoPadding } from "./lib";
import { useProjectModal } from "screens/project-list/util";

export const ProjectPopover = () => {
  const { data: projects, isLoading } = useProjects()
  const pinnedProjects = projects?.filter(project => project.pin)
  const { open } = useProjectModal()

  const content = <ContentContainer>
    <Typography.Text type="secondary">收藏项目</Typography.Text>
    <List>
      {
        pinnedProjects?.map(project => <List.Item>
          <List.Item.Meta title={project.name}></List.Item.Meta>
        </List.Item>)
      }
    </List>
    <Divider />
    <ButtonNoPadding
      onClick={open}
      type={"link"}
    >
      创建项目
    </ButtonNoPadding>
  </ContentContainer>

  return <Popover
    placement="bottom"
    content={content}

  >
    项目
  </Popover>
}

const ContentContainer = styled.div`
  min-width: 30rem;
`