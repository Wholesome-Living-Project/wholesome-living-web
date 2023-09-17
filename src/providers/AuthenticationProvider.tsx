import { UserUpdateUserRequest, UserUserDB } from "@/api/openapi";
import { api } from "@/api/requests";
import {
  clearUserIdFromLocalStorage,
  getUserIdFromLocalStorage,
  setUserIdToLocalStorage,
} from "@/helpers/localStorageHelper";
import { useAuth } from "@/hooks/useAuth";
import { useEffectOnce } from "@/hooks/useEffectOnce";
import { signIn, signOut, signUp } from "@/lib/auth";
import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";

export type UserType = { firebaseUID: string } & UserUserDB;
type AuthenticationType = {
  user: UserType | null;
  loading: boolean;
  getUser: () => void;
  patchUser: (request: UserUpdateUserRequest) => Promise<UserType | undefined>;
  signOutUser: () => void;
  signInWithEmailAndPassword: ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => Promise<UserType | undefined>;
  createUserWithEmailAndPassword: ({
    email,
    password,
    firstName,
    lastName,
    dateOfBirth,
  }: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
  }) => Promise<UserType | undefined>;
};

const AuthContext = createContext<AuthenticationType>({} as AuthenticationType);

export const useAuthentication = () => useContext(AuthContext);

const useProvideAuth = (): AuthenticationType => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<UserType | null>(null);
  const currentFirebaseUser = useAuth();

  const getUser = useCallback(
    async (uid?: string) => {
      if (uid || currentFirebaseUser?.uid) {
        const id = uid ?? currentFirebaseUser?.uid;
        if (id) {
          try {
            setLoading(true);

            const { data } = await api.userApi.usersIdGet(id);
            console.log("got user ", data.email);

            const u: UserType = {
              ...data,
              firebaseUID: id,
            };
            setUser(u);
            if (id) {
              setUserIdToLocalStorage(id);
            }

            return u;
          } catch (e) {
            console.log("error getting user", e);
          } finally {
            setLoading(false);
          }
        }
      } else {
        console.log("firebase user not available? : ", uid);
      }
    },
    [currentFirebaseUser?.uid]
  );

  const patchUser = useCallback(
    async (request: UserUpdateUserRequest) => {
      try {
        await api.userApi.usersPut(request);

        return await getUser(currentFirebaseUser?.uid);
      } catch (e) {
        console.log("error patching user", e);
      }
    },
    [currentFirebaseUser?.uid, getUser]
  );

  const createUserWithEmailAndPassword = useCallback(
    async ({
      email,
      password,
      firstName,
      lastName,
      dateOfBirth,
    }: {
      email: string;
      password: string;
      firstName: string;
      lastName: string;
      dateOfBirth: string;
    }) => {
      const creds = await signUp(email, password);

      console.log(creds);
      try {
        if (creds.data) {
          await api.userApi.usersPost({
            firstName,
            email,
            lastName,
            dateOfBirth,
            id: creds.data.user.uid,
          });
        } else if (
          creds.message === "Firebase: Error (auth/email-already-in-use)."
        ) {
          console.log("email already in use.");
          const existing = await signIn(email, password);

          if (existing?.user.uid) {
            console.log("trying to create user with existing firebase user");
            await api.userApi.usersPost({
              firstName,
              email,
              lastName,
              dateOfBirth,
              id: existing.user.uid,
            });
          }
        }
      } catch (e) {
        console.log(e);
      }

      return getUser(creds.data?.user.uid);
    },
    [getUser]
  );

  const signOutUser = useCallback(async () => {
    try {
      await signOut();
      clearUserIdFromLocalStorage();
      setUser(null);
    } catch (e) {
      /* do nothing as user is probably not logged in */
    } finally {
      setUser(null);
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
    const existingId = getUserIdFromLocalStorage();
    // if user has not been initialized yet (via firebase) we do not create it on app start
    if (!currentFirebaseUser?.uid && !existingId) return;
    currentFirebaseUser?.uid && (await getUser(currentFirebaseUser?.uid));
    existingId && (await getUser(existingId));
  }, [currentFirebaseUser?.uid, getUser]);

  useEffectOnce(() => {
    getInitialUser();
  });

  return {
    user,
    loading,
    getUser,
    patchUser,
    signOutUser,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
  };
};

export const AuthenticationProvider = ({ children }: PropsWithChildren) => {
  const providedAuth = useProvideAuth();
  return (
    <AuthContext.Provider value={providedAuth}>{children}</AuthContext.Provider>
  );
};
