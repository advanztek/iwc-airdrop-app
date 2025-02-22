import { Box, Stack, Typography } from "@mui/material";
import { styles } from "./styles";
import { useBalance } from "../contexts/BalanceContext";
import { useEffect } from "react";

const Header = () => {
  const { grossBalance, fetchBalance } = useBalance();

  useEffect(() => {
    fetchBalance();
  }, []);

  return (
    <>
      <Box position="fixed" sx={styles.navbar}>
        <Stack direction={"row"} sx={styles.navRow}>
          <Box>
            <Typography variant="h6" sx={styles.heroTxt}>
              IWCP Balance
            </Typography>
          </Box>
        </Stack>
        <Stack
          direction={"row"}
          alignItems={"left"}
          justifyContent={"end"}
          gap={2}
          sx={{ display: { xs: "flex", md: "flex" } }}
        >
          <Typography
            variant="h6"
            sx={{ color: "#D0A106", fontWeight: "bold" }}
          >
            <Box
              component="span"
              sx={{ display: "inline-flex", alignItems: "center", gap: 0.5 }}
            >
              {grossBalance}
              <Box component="span" sx={{ ml: 0.5, fontSize: 10 }}>
                IWCP
              </Box>
            </Box>
          </Typography>
        </Stack>
      </Box>
    </>
  );
};

export default Header;
