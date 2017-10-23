import { Button, Grid, HtmlElement } from "cx/widgets";
import { Content, Controller, KeySelection } from "cx/ui";
import { Format } from "cx/util";
import { casual } from '../../casual';

export default (
   <cx>
      <div>
         <Grid
            infinite
            style={{ height: "800px" }}
            mod="responsive"
            lockColumnWidths
            filterParams:bind="$page.filter"
            columns={[
               { header: "Name", field: "fullName", sortable: true },
               { header: "Continent", field: "continent", sortable: true },
               { header: "Browser", field: "browser", sortable: true },
               { header: "OS", field: "os", sortable: true },
               { header: "Visits", field: "visits", sortable: true, align: "right" }
            ]}
            selection={{ type: KeySelection, bind: "$page.selection" }}
            onFetchRecords={({ page, pageSize }) => {
               return new Promise(resolve => {
                  setTimeout(() => {
                     let records = [];
                     for (let i = 0; i < pageSize; i++)
                        records.push({
                           id: (page - 1) * pageSize + i + 1,
                           fullName: casual.full_name,
                           continent: casual.continent,
                           browser: casual.browser,
                           title: casual.full_name,
                           visits: casual.integer(1, 100)
                        });
                     resolve({
                        records,
                        totalRecordCount: 100000
                     });
                  }, 100);
               });
            }}
         />
         <Button
            style="margin-top:44px"
            onClick={(e, {store}) => {
               store.update('$page.filter', filter => (filter || 0)+1);
            }}
         >
            Start again
         </Button>
      </div>
   </cx>
);