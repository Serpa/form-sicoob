import { Avatar, List } from "antd";
import axios from "axios";
import dayjs from "dayjs";
import useSWR from "swr";
import { Icon } from '@iconify/react';
import trophyFilled from '@iconify/icons-ant-design/trophy-filled';

export default function RaffleList(props) {
  const fetcher = (url) => axios.get(url).then((res) => res.data);
  const { data, error, isLoading } = useSWR(
    "/api/raffleWinners/" + props.assembleia?.value,
    fetcher,
    {
      refreshInterval: 1500,
    }
  );
  return (
    <List
      itemLayout="horizontal"
      dataSource={data}
      renderItem={(item, index) => (
        <List.Item>
            {index===0? (<Icon icon={trophyFilled} color="gold" width="50" height="50" />): null}
            {index===1? (<Icon icon={trophyFilled} color="silver" width="50" height="50" />): null}
            {index===2? (<Icon icon={trophyFilled} color="#cd7f32" width="50" height="50" />): null}
          <List.Item.Meta
            avatar={<Avatar src={item.foto.replace("./public", "")} />}
            title={
              <p>
                {item.nomeCliente} {item.nomeAdm ? `- ${item.nomeAdm}` : null}
              </p>
            }
            description={dayjs(item.dataSorteio).format("DD/MM/YYYY HH:mm:ss")}
          />
        </List.Item>
      )}
    />
  );
}
