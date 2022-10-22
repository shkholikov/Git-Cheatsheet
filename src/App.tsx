import React, { useState, useEffect } from "react";
import { Grid, Header, Table } from "semantic-ui-react";
import gitdata from "./gitdata.json";
import { CopyBlock, dracula } from "react-code-blocks";

function App() {
	const [data, setData] = useState<any>();

	useEffect(() => {
		setData(gitdata);
	}, []);

	const createApplicationTable = (type: string): React.ReactElement => (
		<Table inverted celled={false} selectable>
			<Table.Header>
				<Table.Row>
					<Table.HeaderCell>{type}</Table.HeaderCell>
					<Table.HeaderCell></Table.HeaderCell>
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
		<Grid container>
			<Grid.Row centered>
				<Grid.Column>
					<br />
					<Header size="huge" as="h1">
						💻 GIT-CHEATSHEET
					</Header>
					<Header as="h3">🧑🏻‍💻 Stop looking for a git commands and just use this Git-Cheatsheet</Header>
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
	);
}

export default App;
