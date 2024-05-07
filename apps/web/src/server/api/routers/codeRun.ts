import { HttpStatusCode } from "@/server/statusCode";
import { publicProcedure, router } from "../trpc";
import { spawn } from "child_process";
import { z } from "zod";

export const codeRunRouter = router({
    spawnContainer: publicProcedure
        .mutation(async opts => {
            try {

                console.log('i was here');

                const spawnDocker = 'docker rm -f demo2 && docker run -w /home/app -p 2000:3000 --name demo2 -it -d node:latest';
                const container = spawn(spawnDocker, { shell: true });

                container.stdout.on('data', data => {
                    console.log(`Container stdout => ${data}`);
                })

                container.stderr.on('data', data => {
                    console.log(`Container stderr => ${data}`);
                })

                container.on('close', code => {
                    console.log(`Closed with code ${code}`);
                })

                return {
                    code: HttpStatusCode.OK,
                    message: 'success'
                }

            } catch (error) {
                console.log(error);
            }
        }),
    executeCommand: publicProcedure
        .input(z.object({
            command: z.string()
        }))
        .mutation(async opts => {
            const { command } = opts.input;

            try {
                
                const cmd = `sh -c "${command}"`;
                const executeCommand = `docker exec demo2 ${cmd}`;
                const execute = spawn(executeCommand, { shell: true });

                const outputPromise = new Promise((resolve, reject) => {
                    let output = '';

                    // Capture stdout data
                    execute.stdout.on('data', data => {
                        console.log('Command output => ', data.toString());
                        output += data.toString();
                    });

                    // Capture stderr data
                    execute.stderr.on('data', data => {
                        console.error('Command error => ', data.toString());
                        reject(data.toString());
                    });

                    // Resolve the promise when the command completes
                    execute.on('close', code => {
                        console.log(`Command closed with code ${code}`);
                        if (code === 0) {
                            resolve(output);
                        } else {
                            reject(`Command exited with non-zero code ${code}`);
                        }
                    });
                });

                // Wait for the output promise to resolve
                const output = await outputPromise;

                return {
                    code: HttpStatusCode.OK,
                    message: 'executed',
                    output: output
                };

            } catch (error) {   
            }
        }),
    createRepl: publicProcedure
        .input(z.object({
            projectName: z.string(),
            repl: z.string(),
        }))
        .mutation(async opts => {
            try {

                const { projectName, repl } = opts.input;
                const { username } = opts.ctx;

                console.log('here i was');

                if (!username) {
                    return {
                        code: HttpStatusCode.Unauthorized,
                        message: 'not authorized to view this page',
                        container: null
                    }
                }

                console.log('usernmae', username)

                const containerName: string = `${username}-${repl}-${projectName}`;
                console.log(containerName);
                const spawnDocker = `docker rm -f ${containerName} && docker run --name ${containerName} -p 8123:3000 -w /home/app -it -d node:latest`;
                const container = spawn(spawnDocker, { shell: true });
                
                container.stdout.on('data', data => {
                    console.log(`Container stdout => ${data}`);
                })

                container.stderr.on('data', data => {
                    console.log(`Container stderr => ${data}`);
                })

                container.on('close', code => {
                    console.log(`Closed with code ${code}`);
                }) 

                return {
                    code: HttpStatusCode.OK,
                    message: 'created docker container',
                    container: container
                }

            } catch (error) {
                return {
                    code: HttpStatusCode.InternalServerError,
                    message: 'Internal Server Error',
                    container: null
                }                
            }
        }),
    getBoilerPlateCodeInRepl: publicProcedure
        .input(z.object({
            projectName: z.string(),
            repl: z.string()
        }))
        .mutation(async opts => {
            try {
                const { projectName, repl } = opts.input;
                const { username } = opts.ctx;

                const containerName =`${username}-${repl}-${projectName}`;
                const command = "touch index.ts";
                console.log('i was here');
                const cmd = `sh -c "${command}"`;
                const executeCommand = `docker exec ${containerName} ${cmd}`;
                const execute = spawn(executeCommand, { shell: true });

                const outputPromise = new Promise((resolve, reject) => {
                    let output = '';

                    // Capture stdout data
                    execute.stdout.on('data', data => {
                        console.log('Command output => ', data.toString());
                        output += data.toString();
                    });

                    // Capture stderr data
                    execute.stderr.on('data', data => {
                        console.error('Command error => ', data.toString());
                        reject(data.toString());
                    });

                    // Resolve the promise when the command completes
                    execute.on('close', code => {
                        console.log(`Command closed with code ${code}`);
                        if (code === 0) {
                            resolve(output);
                        } else {
                            reject(`Command exited with non-zero code ${code}`);
                        }
                    });
                });
                


            } catch (error) {
                return {
                    code: HttpStatusCode.InternalServerError,
                    message: 'Intenal Server Error',
                    aws: null
                }                
            }
        })
})
