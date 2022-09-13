import React, { useState } from "react";
import { CustomizedRow, ScreenContainer } from "components/lib";
import { useProjectInUrl } from "screens/kanban/util";
import { useDeleteEpic, useEpics } from "utils/epic";
import { useEpicsQueryKey, useEpicSearchParams } from "./util";
import { Button, List, Modal } from "antd";
import { useTasks } from "utils/task";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { Epic } from "types/epic";
import { CreateEpic } from "./create-epic";
import { type } from "os";

export const EpicScreen = () => {
  const { data: currentProject } = useProjectInUrl();
  const { data: epics } = useEpics(useEpicSearchParams());
  const { data: tasks } = useTasks({ processorId: currentProject?.id });
  const { mutate: deleteEpic } = useDeleteEpic(useEpicsQueryKey());

  const confirmDeleteEpic = (epic: Epic) => {
    Modal.confirm({
      title: `确定删除项目组：${epic.name}`,
      content: `点击确定删除`,
      okText: `确定`,
      cancelText: `取消`,
      onOk() {
        deleteEpic({ id: epic.id });
      },
    });
  };

  const [epicCreateOpen, setEpicCreateOpen] = useState(false);

  return (
    <>
      <ScreenContainer>
        <CustomizedRow between={true}>
          <h1>{currentProject?.name}任务组</h1>
          <Button onClick={() => setEpicCreateOpen(true)} type={"link"}>
            创建任务组
          </Button>
        </CustomizedRow>
        <List
          style={{ overflowY: 'scroll'}}
          dataSource={epics}
          itemLayout={"vertical"}
          renderItem={(epic) => (
            <List.Item>
              <List.Item.Meta
                title={
                  <CustomizedRow between={true}>
                    <span>{epic.name}</span>
                    <Button
                      type={"link"}
                      onClick={() => confirmDeleteEpic(epic)}
                    >
                      删除
                    </Button>
                  </CustomizedRow>
                }
                description={
                  <div>
                    <div>
                      开始时间：{dayjs(epic.start).format("YYYY-MM-DD")}
                    </div>
                    <div>结束时间：{dayjs(epic.end).format("YYYY-MM-DD")}</div>
                  </div>
                }
              ></List.Item.Meta>
              <div>
                {tasks
                  ?.filter((task) => task.epicId === epic.id)
                  .map((task) => (
                    <div>
                      <Link
                        key={task.id}
                        to={`/projects/${currentProject?.id}/kanban?editingTaskId=${task.id}`}
                      >
                        {task.name}
                      </Link>
                    </div>
                  ))}
              </div>
            </List.Item>
          )}
        />
        <CreateEpic
          visible={epicCreateOpen}
          onClose={() => setEpicCreateOpen(false)}
        />
      </ScreenContainer>
    </>
  );
};
