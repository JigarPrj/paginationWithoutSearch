import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import React, { useState, useEffect } from "react";
import axios from "axios";
import {GET_DATA} from '../allActions/actions'
import { useSelector ,useDispatch} from 'react-redux'
//@ts-ignore
import { useHistory } from "react-router-dom";
export default function Home() {
  const [data, setData] = useState<any>([]);
  const [count, setCount] = useState<number>(0);
  const [page, setpage] = useState<number>(0);

  const history=useHistory()
  //dispatching method
  const dispatch = useDispatch();
  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      getData();
    }, 10000);
  }, [count]);
  const getData = () => {
    axios
      .get(
        `https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${count}`
      )
      .then((res: any) => {
        //@ts-ignore
        setData((data) => [...data, res?.data?.hits]);
        setCount(count + 1);

        console.log(data);
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div
        style={{
          width: "50%",
          border: "2px solid red",
          margin: "auto",
          marginBottom: "10px",
        }}
      >
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left" data-testid="html-cell">Title</TableCell>
                <TableCell align="left">URL</TableCell>
                <TableCell align="left">Created_At</TableCell>
                <TableCell align="left">Author</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.length !== 0 &&
                data[page]?.map((datas: any) => (
                  <TableRow
                    key={datas.title}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    onClick={() => {
                      dispatch(GET_DATA(datas)) 
                     
                        history.push("/info")
                     
                    }}
                  >
                    <TableCell align="left">{datas.title}</TableCell>
                    <TableCell align="left">{datas.url}</TableCell>
                    <TableCell align="left">{datas.created_at}</TableCell>
                    <TableCell align="left">{datas.author}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div style={{ width: "50%", margin: "auto", marginBottom: "10px" }}>
        <Stack spacing={2}>
          <Pagination
            count={count}
            color="secondary"
            onClick={(e: any) => {
              setpage(Number(e.target.outerText));
            }}
          />
        </Stack>
      </div>
    </div>
  );
}
