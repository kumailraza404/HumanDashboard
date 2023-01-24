import React from "react";
import { Button, Text } from "../../styles";

import { HeaderStyled } from "./styles";
export default function Header() {
  return (
    <HeaderStyled>
      <Text size={20} weight={700}>
        Human Dashboard
      </Text>

      <div style={{ display: "flex", height: "100%" }}>
        <Button>Connect Wallet</Button>

        <Button sx={{ marginLeft: "20px" }}>Sign In</Button>
      </div>
    </HeaderStyled>
  );
}
