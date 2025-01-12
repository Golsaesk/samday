'use client';

import { Skeleton, } from '@mui/material';
import Table from '@/modules/general/components/table-components/table';
import TableRow from '@/modules/general/components/table-components/table-row';
import TableCell from '@/modules/general/components/table-components/table-cell';
import TableRowSection from '@/modules/general/components/table-components/table-row-section';
import { TableCellClassType, } from '@/modules/general/components/table-components/table-cell/TableCell';
import { DASHBOARD_DEFAULT_LIMIT, } from '@/modules/general/libraries/constants';

export default function TableLoading({
  rowCount = DASHBOARD_DEFAULT_LIMIT,
  skeletonHeight = 16,
  classes,
  className,
}: {
  rowCount?: number;
  skeletonHeight?: number;
  classes?: TableCellClassType;
  className?: string;
}) {

  return (
    <Table classes={{ root: className || '', }}>
      {[...Array(rowCount),].map((item: any, index: number) => {
        return (
          <TableRow key={Math.random()}>
            <TableRowSection>
              <TableCell
                {...classes && { classes: classes, } }
                label={
                  <Skeleton
                    width={40}
                    height={skeletonHeight}
                  />
                }
                flex={1}
                justify={'flex-start'}
                displayHeader={index === 0}
                isFirst
              >
                <Skeleton
                  width={30}
                  height={skeletonHeight}
                />
              </TableCell>
              <TableCell
                {...classes && { classes: classes, } }
                label={
                  <Skeleton
                    width={40}
                    height={skeletonHeight}
                  />
                }
                flex={1}
                justify={'flex-start'}
                displayHeader={index === 0}
              >
                <Skeleton
                  width={90}
                  height={skeletonHeight}
                />
              </TableCell>
              <TableCell
                {...classes && { classes: classes, } }
                label={
                  <Skeleton
                    width={40}
                    height={skeletonHeight}
                  />
                }
                flex={1}
                justify={'flex-start'}
                displayHeader={index === 0}
              >
                <Skeleton
                  width={60}
                  height={skeletonHeight}
                />
              </TableCell>
              <TableCell
                {...classes && { classes: classes, } }
                label={
                  <Skeleton
                    width={40}
                    height={skeletonHeight}
                  />
                }
                flex={1}
                justify={'flex-start'}
                displayHeader={index === 0}
              >
                <Skeleton
                  width={50}
                  height={skeletonHeight}
                />
              </TableCell>
              <TableCell
                {...classes && { classes: classes, } }
                label={
                  <Skeleton
                    width={40}
                    height={16}
                  />
                }
                flex={1}
                justify={'flex-start'}
                displayHeader={index === 0}
              >
                <Skeleton
                  width={50}
                  height={skeletonHeight}
                />
              </TableCell>
            </TableRowSection>
            <TableRowSection variant={'tools'}>
              <TableCell
                {...classes && { classes: classes, } }
                label={
                  <Skeleton
                    width={30}
                    height={skeletonHeight}
                  />
                }
                flex={1}
                displayHeader={index === 0}
              >
                <Skeleton
                  width={30}
                  height={30}
                  variant={'circular'}
                />
              </TableCell>
              <TableCell
                {...classes && { classes: classes, } }
                label={
                  <Skeleton
                    width={30}
                    height={skeletonHeight}
                  />
                }
                flex={1}
                displayHeader={index === 0}
                isLast
              >
                <Skeleton
                  width={30}
                  height={30}
                  variant={'circular'}
                />
              </TableCell>
            </TableRowSection>
          </TableRow>
        );
      })}
    </Table>
  );
}