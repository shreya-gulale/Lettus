-- The public.handle_new_user() function (added in the initial migration)
-- was never actually wired to auth.users on a trigger — it appears the
-- previous project had this trigger created by hand outside of migrations.
-- Without it, new sign-ups never get a row in public.profiles, breaking
-- the Admin/Dashboard pages. Wire it up here so a fresh project (or any
-- project re-running migrations from scratch) gets correct behavior.

CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
