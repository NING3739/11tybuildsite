---
title: A Deep Dive Into Eleventy Static Site Generator
author: NING LI
date: 2023-10-01
tags:
  - featured
categories:
  - 11ty
image: https://camo.githubusercontent.com/124e337fb005b0e70eb3758b431b051eaf5419b3a709062fbcce6d661a6ea116/68747470733a2f2f7777772e313174792e6465762f696d672f6c6f676f2d6769746875622e737667
imageAlt: 11ty logo
description: I will use my personal website as an example to tell you how to build a website from scratch using the 11ty static website generator. It's going to be fun!
---

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Massa placerat duis ultricies lacus sed turpis tincidunt id. Sit amet nulla facilisi morbi tempus iaculis urna id volutpat. Erat nam at lectus urna duis convallis convallis. Purus faucibus ornare suspendisse sed nisi. Mauris rhoncus aenean vel elit. Dignissim convallis aenean et tortor at risus viverra adipiscing at. Tellus rutrum tellus pellentesque eu tincidunt tortor. Laoreet suspendisse interdum consectetur libero id faucibus nisl tincidunt eget. Eu mi bibendum neque egestas congue quisque.

Nec ultrices dui sapien eget mi proin sed libero enim. Vestibulum mattis ullamcorper velit sed ullamcorper morbi tincidunt ornare. Justo eget magna fermentum iaculis eu non diam phasellus vestibulum. Iaculis at erat pellentesque adipiscing commodo elit at imperdiet dui. Consectetur adipiscing elit duis tristique sollicitudin nibh sit amet commodo. Aliquam id diam maecenas ultricies mi. Faucibus in ornare quam viverra. Nisi est sit amet facilisis magna etiam tempor orci eu. Mauris commodo quis imperdiet massa tincidunt nunc pulvinar sapien et. Fermentum dui faucibus in ornare quam viverra orci sagittis eu. Cras pulvinar mattis nunc sed. Pharetra et ultrices neque ornare aenean euismod elementum. Urna duis convallis convallis tellus. Donec massa sapien faucibus et. Id faucibus nisl tincidunt eget nullam non. Quam pellentesque nec nam aliquam sem et tortor consequat.

Ac auctor augue mauris augue neque. Fringilla phasellus faucibus scelerisque eleifend donec pretium. Tellus in hac habitasse platea dictumst vestibulum rhoncus est. Pretium viverra suspendisse potenti nullam ac tortor vitae purus faucibus. Arcu ac tortor dignissim convallis aenean. Dolor magna eget est lorem ipsum dolor sit amet consectetur. Porttitor eget dolor morbi non. Quis lectus nulla at volutpat diam ut venenatis tellus. Ultricies leo integer malesuada nunc vel risus. Facilisis sed odio morbi quis commodo odio aenean.

Commodo ullamcorper a lacus vestibulum sed arcu non odio euismod. Sit amet cursus sit amet dictum sit amet justo. Euismod lacinia at quis risus sed vulputate odio ut. Malesuada pellentesque elit eget gravida. Diam donec adipiscing tristique risus nec. Eu nisl nunc mi ipsum faucibus vitae aliquet nec. Risus at ultrices mi tempus imperdiet nulla malesuada pellentesque. Aenean euismod elementum nisi quis eleifend quam adipiscing vitae proin. Nibh ipsum consequat nisl vel. Sit amet consectetur adipiscing elit. Porta nibh venenatis cras sed felis eget. A condimentum vitae sapien pellentesque habitant morbi tristique senectus et. Orci phasellus egestas tellus rutrum. Ac felis donec et odio pellentesque diam volutpat commodo sed. Viverra nam libero justo laoreet sit amet cursus sit amet. Duis at consectetur lorem donec massa sapien faucibus. Et leo duis ut diam quam nulla porttitor massa. Eros donec ac odio tempor. Massa ultricies mi quis hendrerit. Semper quis lectus nulla at volutpat diam ut venenatis.

Urna condimentum mattis pellentesque id nibh tortor id aliquet. Mollis nunc sed id semper risus in. Morbi blandit cursus risus at ultrices mi. Lectus vestibulum mattis ullamcorper velit. Facilisis mauris sit amet massa vitae tortor. Ullamcorper sit amet risus nullam. Nunc sed blandit libero volutpat sed. Ut tortor pretium viverra suspendisse potenti nullam ac tortor. Convallis convallis tellus id interdum velit laoreet id. Est pellentesque elit ullamcorper dignissim cras tincidunt lobortis feugiat. Non nisi est sit amet facilisis magna etiam tempor. Nisl nunc mi ipsum faucibus vitae.

```r
# load packages
library(shiny)
library(dplyr)
library(ggplot2)
library(shinythemes)


custom_css <- "
.record-table {
  margin-top: 20px;
}
"

# 定义 UI 组件
ui <- bootstrapPage(
  theme = shinytheme("flatly"),
  headerPanel("服务费用计算器"),
  sidebarPanel(
    textInput(inputId = "name", label = "客户名字：", value = ""),
    selectInput(inputId = "service", label = "服务类型：",
                choices = c("日常清洁", "深层清洁", "搬出/搬入")),
    checkboxGroupInput(inputId = "addone", label = "附加服务：",
                       choices = c("烤箱" = "烤箱", "窗户" = "窗户", "墙和天花板" = "墙和天花板")),
    numericInput(inputId = "oven_num", label = "烤箱数量：", value = 1, min = 1),
    numericInput(inputId = "window_num", label = "窗户数量：", value = 1, min = 1),
    textInput(inputId = "time", label = "服务时间（小时）：", value = "1"),
    dateInput(inputId = "date", label = "服务日期：",
              value = Sys.Date()),
    actionButton(inputId = "add_gst_button", label = "添加 GST（15%）"),
    actionButton(inputId = "remove_gst_button", label = "取消 GST（15%）"),
    actionButton(inputId = "add", label = "添加服务记录"),
    actionButton(inputId = "plot_button", label = "生成图表")
  ),
  mainPanel(
    h3("计算结果："),
    textOutput(outputId = "total"),
    downloadButton(outputId = "download", label = "下载服务记录"),
    tags$head(tags$style(HTML(custom_css))),
    fluidRow(
      column(12,
             plotOutput(outputId = "plot")
      ),
      column(12,
             div(class = "record-table",
                 tableOutput(outputId = "records")
             )
      )
    )
  ),
)


# 定义 server 组件
server <- function(input, output, session) {
  gst_active <- reactiveVal(FALSE)

  observeEvent(input$add_gst_button, {
    gst_active(TRUE)
  })

  observeEvent(input$remove_gst_button, {
    gst_active(FALSE)
  })


  service_records <- reactiveValues(data = data.frame(Date = character(),
                                                      Name = character(),
                                                      Service = character(),
                                                      Time = numeric(),
                                                      Cost = numeric(),
                                                      Deleted = logical(),
                                                      stringsAsFactors = FALSE))


  # 计算总费用
  total_cost <- reactive({
    if(input$service == "日常清洁") {
      cost_per_hour_service <- 40
    } else if(input$service == "深层清洁") {
      cost_per_hour_service <- 100
    } else {
      cost_per_hour_service <- 200
    }

    # 初始化 cost_per_hour_addone 变量
    cost_per_hour_addone <- 0

    if("烤箱" %in% input$addone) {
      cost_per_hour_addone <- cost_per_hour_addone + (60 * input$oven_num)
    }
    if("窗户" %in% input$addone) {
      cost_per_hour_addone <- cost_per_hour_addone + (30 * input$window_num)
    }
    if("墙和天花板" %in% input$addone) {
      cost_per_hour_addone <- cost_per_hour_addone + 120
    }

    total <- (cost_per_hour_service) * as.numeric(input$time) + cost_per_hour_addone

    # 应用 GST
    if (gst_active()) {
      total <- total * 1.15
    }

    return(total)
  })


  # 添加服务记录
  observeEvent(input$add, {
    if(input$name != "") {
      record <- data.frame(Date = format(input$date, "%m/%d/%y"),
                           Name = input$name,
                           Service = paste(input$service, "和", paste(input$addone, collapse = "，")),
                           Time = as.numeric(input$time),
                           Cost = total_cost(),
                           stringsAsFactors = FALSE)
      service_records$data <- rbind(service_records$data, record)
    }
  })


  # 显示计算结果
  output$total <- renderText({
    if(input$name != "") {
      cost <- total_cost()
      paste0(input$name, " 需要支付 $", round(cost, 2), " 的服务费用。")
    } else {
      "请输入客户名字。"
    }
  })

  # 绘制时间序列图
  output$plot <- renderPlot({
    if(input$plot_button > 0) {
      plot_data <- service_records$data %>%
        mutate(Date = as.Date(Date, "%m/%d/%y")) %>%
        group_by(Date) %>%
        summarize(TotalCost = sum(Cost))

      ggplot(plot_data, aes(x = Date, y = TotalCost)) +
        geom_line() +
        geom_text(aes(label = round(TotalCost, 2)), vjust = -0.5, size = 4) +
        labs(title = "服务费用时间序列图", x = "日期", y = "服务费用") +
        theme_minimal()
    }
  })


  # 下载服务记录
  output$download <- downloadHandler(
    filename = function() {
      paste("service_records_", Sys.Date(), ".csv", sep = "")
    },
    content = function(file) {
      req(service_records$data)
      write.csv(service_records$data, file, row.names = FALSE)
    }
  )

  # 显示服务记录
  output$records <- renderTable({
    service_records$data %>%
      arrange(desc(Date))
  })

}

# 运行应用程序
shinyApp(ui, server)

```
