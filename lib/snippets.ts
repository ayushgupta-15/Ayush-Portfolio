export type Lang = "verilog" | "c" | "cpp" | "ts" | "py";

export type Snippet = {
  id: string;
  lang: Lang;
  file: string;
  repo: string;
  chapter: 1 | 2 | 3;
  code: string;
};

// Every snippet below is real code from the named repository, lightly trimmed to fit a panel.
export const snippets: Snippet[] = [
  {
    id: "hazard",
    lang: "verilog",
    file: "hazard_detection_unit.v",
    repo: "rv32i-5stage-pipelined-processor",
    chapter: 1,
    code: `always @(*) begin
  if (id_ex_memread && (id_ex_rd != 0) &&
     ((id_ex_rd == if_id_rs1) ||
      (id_ex_rd == if_id_rs2))) begin
    pc_write    = 0;
    if_id_write = 0;
    stall       = 1;
  end else begin
    pc_write    = 1;
    if_id_write = 1;
    stall       = 0;
  end
end`,
  },
  {
    id: "arbiter",
    lang: "verilog",
    file: "round_robin_arbiter.sv",
    repo: "axi4-lite-interconnect-sv",
    chapter: 1,
    code: `always_comb begin
  grant_comb = '0;
  for (int i = 0; i < NUM_MASTERS; i++) begin
    int unsigned idx =
        (priority_idx + i) % NUM_MASTERS;
    if (req[idx]) begin
      grant_comb[idx] = 1'b1;
      break;
    end
  end
end`,
  },
  {
    id: "scheduler",
    lang: "c",
    file: "os_scheduler.c",
    repo: "RTOS-Kernel",
    chapter: 2,
    code: `os_tcb_t *os_scheduler_get_next(void) {
  if (ready_bitmap == 0) return NULL;

  uint32_t highest_prio =
      31 - __builtin_clz(ready_bitmap);

  os_list_node_t *node =
      ready_queues[highest_prio].head;
  if (node == NULL) return NULL;

  return CONTAINER_OF(node, os_tcb_t, ready_node);
}`,
  },
  {
    id: "ready",
    lang: "c",
    file: "os_scheduler.c",
    repo: "RTOS-Kernel",
    chapter: 2,
    code: `/* O(1): one bit per priority level */
ready_bitmap |=  (1U << tcb->priority);
ready_bitmap &= ~(1U << tcb->priority);`,
  },
  {
    id: "lexer",
    lang: "cpp",
    file: "Lexer.cpp",
    repo: "mini-compiler",
    chapter: 2,
    code: `Token Lexer::scanIdentifierOrKeyword() {
  int startLine = line_, startCol = col_;
  std::string lexeme;
  while (!isAtEnd() &&
         (std::isalnum(peek()) || peek() == '_')) {
    lexeme += advance();
  }
  TokenType kw = keywordType(lexeme);
  return Token(kw, lexeme, startLine, startCol);
}`,
  },
  {
    id: "citations",
    lang: "ts",
    file: "utils.ts",
    repo: "Noesis",
    chapter: 3,
    code: `export const validateCitations = (
  report: string, findingsCount: number
) => {
  const matches = [...report.matchAll(/\\[(\\d+)\\]/g)]
    .map((m) => Number(m[1]));
  const cited = [...new Set(matches)];
  const invalid = cited.filter(
    (i) => i < 1 || i > findingsCount
  );
  return { cited, invalid };
}`,
  },
  {
    id: "tenant",
    lang: "ts",
    file: "task.service.ts",
    repo: "TeamSync",
    chapter: 3,
    code: `const project = await ProjectModel.findById(projectId);

if (!project ||
    project.workspace.toString() !==
    workspaceId.toString()) {
  throw new NotFoundException(
    "Project not found or does not belong to this workspace"
  );
}`,
  },
  {
    id: "rank",
    lang: "py",
    file: "run_ablation.py",
    repo: "large-scale-ecommerce-recommender",
    chapter: 3,
    code: `ranker = lgb.LGBMRanker(
    objective="lambdarank",
    metric="ndcg",
    eval_at=[20],
    n_estimators=300,
    learning_rate=0.05,
    num_leaves=31,
    subsample=0.8,
    random_state=42,
)`,
  },
];
