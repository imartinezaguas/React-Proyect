import React from 'react'
import { TablaProductos } from './TablaProductos';

export const DashboardPage = () => {
  
  let roles = localStorage.getItem('rol');
  const cleanString = roles.replace(/[\[\]\s]/g, '').split(',');
  const hasAdminRole = cleanString.includes("ROLE_ADMIN");
  const rol = hasAdminRole ? "ROLE_ADMIN" : ""

  
  return (
    
    <TablaProductos isAdmin={rol === 'ROLE_ADMIN'}></TablaProductos>
  )
}
