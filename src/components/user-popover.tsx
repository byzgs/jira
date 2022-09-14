import React from "react";
import { Divider, List, Popover, Typography } from "antd";
import styled from "@emotion/styled";
import { useUsers } from "utils/users";

export const UserPopover = () => {
  const { data: users, isLoading, refetch } = useUsers();

  const content = (
    <ContentContainer>
      <Typography.Text type="secondary">组员列表</Typography.Text>
      <List>
        {users?.map((user) => (
          <List.Item key={user.id}>
            <List.Item.Meta title={user.name}></List.Item.Meta>
          </List.Item>
        ))}
      </List>
      <Divider />
    </ContentContainer>
  );

  return (
    <Popover
      placement="bottom"
      content={content}
      onVisibleChange={() => refetch()}
    >
      <span style={{cursor: 'pointer'}}>组员</span>
    </Popover>
  );
};

const ContentContainer = styled.div`
  min-width: 30rem;
`;
