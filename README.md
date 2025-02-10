# **Uncorking Insights: Exploring the World of Wine through Data Visualizations**  

## **Project Overview**  
This project was developed as part of our **Data Visualization** class, where we explored the vast world of wine through interactive data visualizations. Using **D3.js** and **Tableau**, we aimed to uncover trends, patterns, and insights from a dataset containing nearly **130,000 wine reviews**.  

What makes this project even more interesting is that neither of us actually drinks wine! That made our curiosity-driven approach all the more exciting-how does the world perceive wine? What factors influence its price and rating? Which regions dominate wine production? Through visual storytelling, we sought to answer these questions in a compelling and interactive way.  

## **Tech Stack & Tools**  
- **Frontend**: HTML, CSS, JavaScript  
- **Data Visualization**: **D3.js**, **Tableau**  
- **Dataset**: Wine Enthusiast Reviews (sourced from [Kaggle](https://www.kaggle.com/datasets/zynicide/wine-reviews))  

## **Project Goals & Key Questions**  
Through visual analytics, we aimed to explore:  
1. **Wine Distribution Across Regions**  
   - Which provinces have the highest and lowest diversity of wines?  
   - Visualized using a **heatmap**.  

2. **Price vs. Rating**  
   - Does a higher price guarantee better wine quality?  
   - Explored using an **interactive scatter plot**.  

3. **Wineries & Wine Varieties**  
   - Which wineries dominate specific wine varieties?  
   - Illustrated through a **Sankey diagram** to show the flow of wines.  

## **Data Processing**  
Before diving into visualization, we cleaned and processed the dataset by:  
✅ Selecting key features: `country`, `points`, `price`, `province`, `variety`, and `winery`  
✅ Removing **null values** from critical columns (`country`, `price`, `taster_name`)  
✅ Eliminating **duplicate records**  
✅ Preparing data to ensure a smooth interactive experience  

## **Features & Interactivity**  
✨ **Dynamic Filtering**: Users can filter visualizations by **country** to tailor their insights.  
✨ **Hover Effects**: Tooltips provide additional details when users hover over data points.  
✨ **Customizable Legends**: Users can adjust the color scales and labels for clarity.  

