import { Application } from "express-serve-static-core";

export function startServer(app: Application, port: number) {
  app.listen(port, (err: any) => {
    if (err) return console.error(err);
    return console.log(`Server started on port ${port}`);
  });
}
