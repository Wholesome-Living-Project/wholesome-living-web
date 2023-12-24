import { UserUserDB } from "@/api/openapi";
import { api } from "@/api/requests";
import {
  clearUserIdFromLocalStorage,
  setUserIdToLocalStorage,
} from "@/helpers/localStorageHelper";
import { signIn, signOut } from "@/lib/auth";
import { auth } from "@/lib/firebase";
import { User, onAuthStateChanged } from "firebase/auth";
import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

export type UserType = { firebaseUID: string } & UserUserDB;
type AuthenticationType = {
  user: UserType | null;
  currentFirebaseUser: User | null;
  loading: boolean;
  getUser: () => Promise<UserType | undefined>;
  signOutUser: () => void;
  signInWithEmailAndPassword: ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => Promise<UserType | undefined>;
};

const AuthContext = createContext<AuthenticationType>({} as AuthenticationType);

export const useAuthentication = () => useContext(AuthContext);

const useProvideAuth = (): AuthenticationType => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<UserType | null>(null);
  const [currentFirebaseUser, setCurrentFirebaseUser] = useState<User | null>(
    null
  );

  const getUser = useCallback(
    async (uid?: string) => {
      if (uid || currentFirebaseUser?.uid) {
        const id = uid ?? currentFirebaseUser?.uid;
        if (id) {
          try {
            const { data } = await api.userApi.usersIdGet(id);
            console.log("got user ", data.email);

            const u: UserType = {
              ...data,
              firebaseUID: id,
            };
            setUser(u);

            if (id) setUserIdToLocalStorage(id);
            return u;
          } catch (e) {
            console.log("error getting user", e);
          }
        }
      } else {
        console.log("firebase user not available? : ", uid);
      }
    },
    [currentFirebaseUser?.uid]
  );

  const signOutUser = useCallback(async () => {
    try {
      await signOut();
    } catch (e) {
      /* do nothing as user is probably not logged in */
    } finally {
      setUser(null);
      clearUserIdFromLocalStorage();
    }
  }, []);

  const signInWithEmailAndPassword = useCallback(
    async ({ email, password }: { email: string; password: string }) => {
      const fbUser = await signIn(email, password);

      return getUser(fbUser?.user.uid);
    },
    [getUser]
  );

  const getInitialUser = useCallback(async () => {
    try {
      onAuthStateChanged(
        auth,
        async (user) => {
          setCurrentFirebaseUser(user);
        },
        (error) => {
          console.log(error);
        }
      );
    } catch (e) {
      console.log(e);
    }

    // if user has not been initialized yet (via firebase) we do not create it on app start
    if (!currentFirebaseUser?.uid) return;

    try {
      setLoading(true);
      await getUser(currentFirebaseUser.uid);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }, [currentFirebaseUser, getUser]);

  useEffect(() => {
    getInitialUser();
  }, [getInitialUser]);

  return {
    user,
    currentFirebaseUser,
    loading,
    getUser,
    signOutUser,
    signInWithEmailAndPassword,
  };
};

export const AuthenticationProvider = ({ children }: PropsWithChildren) => {
  const providedAuth = useProvideAuth();
  return (
    <AuthContext.Provider value={providedAuth}>{children}</AuthContext.Provider>
  );
};
