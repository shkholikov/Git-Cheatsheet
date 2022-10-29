import React, { useState, useEffect, useCallback } from "react";
import { Divider, Grid, Header, Table } from "semantic-ui-react";
import gitdata from "./gitdata.json";
import { CopyBlock, dracula } from "react-code-blocks";
import Particles from "react-particles";
import type { Container, Engine } from "tsparticles-engine";
import { loadFull } from "tsparticles";

function App() {
	const [data, setData] = useState<any>();

	useEffect(() => {
		setData(gitdata);
	}, []);

	const particlesInit = useCallback(async (engine: Engine) => {
		await loadFull(engine);
	}, []);

	const particlesLoaded = useCallback(async (container: Container | undefined) => {
		await console.log(container);
	}, []);

	const createApplicationTable = (type: string): React.ReactElement => (
		<Table inverted celled={false} selectable>
			<Table.Header>
				<Table.Row>
					<Table.HeaderCell>{type}</Table.HeaderCell>
					<Table.HeaderCell>DESCRIPTION</Table.HeaderCell>
				</Table.Row>
			</Table.Header>

			<Table.Body>
				{data?.[`${type}`].map((item: any, idx: string | number) => (
					<Table.Row id={idx}>
						<Table.Cell width={6}>
							<CopyBlock text={item.code} language={"bash"} codeBlock theme={dracula} showLineNumbers={false} />
						</Table.Cell>
						<Table.Cell width={8}>{item.description}</Table.Cell>
					</Table.Row>
				))}
			</Table.Body>
		</Table>
	);

	return (
		<>
			<Particles
				id="tsparticles"
				init={particlesInit}
				loaded={particlesLoaded}
				options={{
					background: {
						opacity: 0
					},
					fpsLimit: 120,
					interactivity: {
						events: {
							onClick: {
								enable: true,
								mode: "push"
							},
							onHover: {
								enable: true,
								mode: "repulse"
							},
							resize: true
						},
						modes: {
							push: {
								quantity: 4
							},
							repulse: {
								distance: 200,
								duration: 0.4
							}
						}
					},
					particles: {
						color: {
							value: "#000000"
						},
						links: {
							color: "#000000",
							distance: 150,
							enable: true,
							opacity: 0.5,
							width: 1
						},
						collisions: {
							enable: true
						},
						move: {
							direction: "none",
							enable: true,
							outModes: {
								default: "bounce"
							},
							random: false,
							speed: 2,
							straight: false
						},
						number: {
							density: {
								enable: true,
								area: 800
							},
							value: 80
						},
						opacity: {
							value: 0.5
						},
						shape: {
							type: "circle"
						},
						size: {
							value: { min: 1, max: 5 }
						}
					},
					detectRetina: true
				}}
			/>
			<Grid container>
				<Grid.Row centered>
					<Grid.Column>
						<Divider horizontal>GIT CHEATSHEET</Divider>
						<Header as="h1">💻 GIT-CHEATSHEET</Header>
						<Header as="h3">🧑🏻‍💻 Stop looking for a git commands and just use this Git-Cheatsheet!</Header>
					</Grid.Column>
				</Grid.Row>
				<Grid.Row>
					<Grid.Column>
						{data ? createApplicationTable("GIT BASICS") : ""}
						{data ? createApplicationTable("UNDOING CHANGES") : ""}
						{data ? createApplicationTable("REWRITING GIT HISTORY") : ""}
						{data ? createApplicationTable("GIT BRANCHES") : ""}
						{data ? createApplicationTable("REMOTE REPOSITORIES") : ""}
					</Grid.Column>
				</Grid.Row>
			</Grid>
			<Divider horizontal>OOPS</Divider>
			<Header as="h3" textAlign="center" href>
				👋🏻 Say hi! <a href="https://www.instagram.com/sh.kholikov/">🧑🏻‍💻 Shakhzod Kholikov</a> on Instagram
			</Header>
			<Divider horizontal></Divider>
		</>
	);
}

export default App;
