"use client";

import React from "react";

import styled from "styled-components";

const TextInputInner = styled.div`
  display: flex;
  width: 300px;
  padding: 8px 12px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.GRAY[200]}
  background: ${({ theme }) => theme.colors.WHITE};
  &:hover {
    border: 1px solid ${({ theme }) => theme.colors.GRAY[300]}
  }
`;
