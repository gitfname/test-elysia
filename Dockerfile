FROM oven/bun:1.2.15

WORKDIR /app

COPY package.json bun.lock .

RUN bun install --production

COPY . .

# RUN bunx drizzle-kit generate

RUN bun build --compile --sourcemap ./src/index.ts --outfile myapp

EXPOSE 3000

CMD ["./myapp"]