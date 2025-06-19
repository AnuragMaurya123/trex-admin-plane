export interface PieDatum {
  name: string;
  value: number;
  color: string;
}

export interface PieDiagramProps {
  title?: string;
  className?: string;
  statusData: PieDatum[];
  innerRadius?: number;
  outerRadius?: number;
  showLegend?: boolean;
  showIcon?: boolean;
}

export interface EarningsDatum {
  month: string;
  earnings: number;
}


export interface GraphDiagramProps {
  title?: string;
  data: EarningsDatum[];
  xKey?: string;
  yKey?: string;
  className?: string;
  color?: string;
  yFormatter?: (value: number) => string;
}
