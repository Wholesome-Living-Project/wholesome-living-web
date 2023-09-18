import { defaultTextProps } from "@/helpers/defaultTextProps";
import { SpendingsTableType } from "@/providers/FinanceProvider";
import { MeditationTableType } from "@/providers/MeditationProvider";
import { Table as RadixTable, ScrollArea, Text } from "@radix-ui/themes";

type Props = {
  data: (SpendingsTableType | MeditationTableType)[];
  maxHeight?: number;
};
const Table = ({ data, maxHeight }: Props) => {
  if (!data.length) return null;
  return (
    <ScrollArea style={{ maxHeight: maxHeight }}>
      <RadixTable.Root>
        <RadixTable.Header>
          <RadixTable.Row>
            {Object.keys(data[0]).map((header, i) => (
              <RadixTable.ColumnHeaderCell key={i}>
                <Text {...defaultTextProps}>
                  {header.charAt(0).toUpperCase() + header.slice(1)}
                </Text>
              </RadixTable.ColumnHeaderCell>
            ))}
          </RadixTable.Row>
        </RadixTable.Header>

        <RadixTable.Body>
          {data.map((row, i) => (
            <RadixTable.Row key={i} style={{ position: "relative" }}>
              {Object.values(row).map((cell, j) =>
                j === 0 ? (
                  <RadixTable.RowHeaderCell key={j}>
                    <Text {...defaultTextProps}>{cell}</Text>
                  </RadixTable.RowHeaderCell>
                ) : (
                  <RadixTable.Cell key={j}>
                    <Text {...defaultTextProps}>{cell}</Text>
                  </RadixTable.Cell>
                )
              )}
            </RadixTable.Row>
          ))}
        </RadixTable.Body>
      </RadixTable.Root>
    </ScrollArea>
  );
};

export default Table;
