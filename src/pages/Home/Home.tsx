import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FeedsTable from "../../components/FeedsTable/FeedsTable";
import useFetchFeeds from "../../hooks/useFeeds";
import "./Home.scss";
import Loader from "../../components/Loader/Loader";

const Home = () => {
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentRowsPerPage, setCurrentRowsPerPage] = useState<number>(10);

  const { data, metadata, loading, error } = useFetchFeeds(
    currentPage,
    currentRowsPerPage
  );

  useEffect(() => {
    const params = new URLSearchParams();
    params.append("page", currentPage.toString());
    params.append("limit", currentRowsPerPage.toString());
    navigate({ search: params.toString() });
  }, [currentPage, currentRowsPerPage, navigate]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage + 1);
  };

  const handleRowsPerPageChange = (rowsPerPage: number) => {
    setCurrentRowsPerPage(rowsPerPage);
    setCurrentPage(1);
  };

  return (
    <div className="home-container">
      {loading && <Loader />}
      {error && <p>Error: {error}</p>}
      {data && data.length > 0 && (
        <>
          <h1>Propiedades en alquiler</h1>
          <FeedsTable
            data={data}
            page={currentPage}
            rowsPerPage={currentRowsPerPage}
            totalCount={metadata?.total}
            totalPages={metadata?.totalPages}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleRowsPerPageChange}
          />
        </>
      )}
    </div>
  );
};

export default Home;
