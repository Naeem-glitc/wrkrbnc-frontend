import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import {jwtDecode} from "jwt-decode";

export const useProtectedRoute = (rolesAllowed) => {
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) return router.push("/login");

    try {
      const decoded = jwtDecode(token);
      if (!rolesAllowed.includes(decoded.role)) router.push("/unauthorized");
    } catch (err) {
      router.push("/login");
    }
  }, [router, rolesAllowed]);
};
