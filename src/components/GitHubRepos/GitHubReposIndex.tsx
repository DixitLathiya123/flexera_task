import { InputBase, TablePagination } from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import Loader from "../Ui/Loader";
import { GitHubRoot, RepoItems } from "../../models/GitHubModels";
import GitHubRepos from "./GitHubRepos";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";

const BASE_URL = "https://api.github.com/search/repositories";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  display: "flex",
  alignItems: "center",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.05),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.black, 0.1),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "60%",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const GitHubReposIndex = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isLoading, setIsLoading] = useState(true);
  const [reposData, setReposData] = useState<GitHubRoot>();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const URL = `${BASE_URL}?sort=stars&q=javascript&per_page=${rowsPerPage}&page=${
      page + 1
    }`;
    const abortController = new AbortController();
    const { signal } = abortController;
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(URL, { signal });
        // console.log(response,"res");
        setReposData(response.data);
      } catch (error) {
        setIsLoading(false);
        console.error("Error:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();

    return () => {
      abortController.abort();
    };
  }, [rowsPerPage, page]);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredRepos =
    reposData &&
    reposData.items?.filter((repo: RepoItems) =>
      repo.name.toLowerCase().includes(searchTerm.trim().toLowerCase())
    );

  return (
    <div className="container mt-5">
      <div className="row d-flex justify-content-center">
        <Search className="col-md-8">
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search Name…"
            inputProps={{ "aria-label": "search" }}
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </Search>
        <TablePagination
          className="col-md-4"
          component="div"
          count={reposData ? reposData?.total_count : 100}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>

      <div className="row">
        {isLoading ? (
          <Loader />
        ) : (
          filteredRepos &&
          filteredRepos?.map((repo: RepoItems) => (
            <div className="col-md-6 col-lg-3 mt-4" key={repo.id}>
              <GitHubRepos GitHubRepos={repo} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default GitHubReposIndex;
